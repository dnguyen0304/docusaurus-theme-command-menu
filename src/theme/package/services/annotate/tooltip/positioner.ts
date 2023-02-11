// Released under the 2-Clause BSD license, copied from:
// https://github.com/hypothesis/client
//
// Copyright (c) 2013-2019 Hypothes.is Project and contributors
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import { isTouchDevice } from '../utils/user-agent';

// Height of the arrow.
const ARROW_HEIGHT: number = 10;
// Gap between the selection and the arrow.
const ARROW_GAP: number = 20;

interface Positioner {
    position: (selectionRect: DOMRect, isRtlSelection: boolean) => Position;
}

interface SizableHTMLContainer {
    innerWidth: number;
    innerHeight: number;
}

enum ArrowDirection {
    // Position the tooltip below the selection with the arrow pointing up.
    Up = 'up',
    // Position the tooltip above the selection with the arrow pointing down.
    Down = 'down',
}

enum CSSPosition {
    Static = 'static',
}

type Position = Readonly<{
    // Horizontal offset from left edge of viewport.
    left: number;
    // Vertical offset from top edge of viewport.
    top: number;
    // Max z-index.
    zIndex: number;
    // Direction the tooltip's arrow should be pointing. The tooltip's position
    // relative to the selection is the opposite of this.
    arrowDirection: ArrowDirection;
}>

/**
 * Traverse up the tree and find the first ancestor that is positioned.
 *
 * @param element HTML element.
 * @return Nearest positioned ancestor. If no ancestor is positioned, return
 *         the root element.
 */
function getNearestPositionedAncestor(element: Element): Element {
    if (element.parentElement == null) {
        return element
    }
    let parentElement = element.parentElement;
    while (parentElement.parentElement) {
        if (getComputedStyle(parentElement).position !== CSSPosition.Static) {
            break;
        }
        parentElement = parentElement.parentElement;
    }
    return parentElement;
}

// Positions the tooltip at the top-center edge of the selection.
class SelectionTopCenterPositioner implements Positioner {

    private arrowGap: number;

    constructor(arrowGap: number = ARROW_GAP) {
        this.arrowGap = arrowGap;
    }

    /**
     *
     * Calculate the XYZ viewport coordinates for the tooltip's position.
     * 
     * The direction of its arrow is always down.
     *
     * @param   selectionRect Selection rect.
     * @return  Position
     */
    position(selectionRect: DOMRect): Position {
        const { x, y, width } = selectionRect;
        const left = x + width / 2;
        // TODO: Fix incorrect position when selecting LTR vs. RTL.
        // TODO: Fix incorrect position when selecting across multiple nodes.
        const top = y + window.scrollY - this.arrowGap;

        // Fallback to an arbitrary large number (2^15).
        const zIndex = 32768

        return {
            left,
            top,
            zIndex,
            arrowDirection: ArrowDirection.Down,
        };
    }
}

/**
 * Positions the XYZ coordinates of a tooltip within a view (usually the
 * window).
 */
class SelectionEndPositioner implements Positioner {

    _tooltip: HTMLElement;

    _tooltipGetWidth: () => number;
    _tooltipGetHeight: () => number;
    _viewGetWidth: () => number;
    _viewGetHeight: () => number;
    // TODO: Change private member naming convention to exclude underscore.
    private _arrowHeight: number;
    private _arrowGap: number;

    constructor(
        tooltip: HTMLElement,
        viewGetWidth: () => number,
        viewGetHeight: () => number,
        arrowHeight: number = ARROW_HEIGHT,
        arrowGap: number = ARROW_GAP,
    ) {
        this._tooltip = tooltip;
        this._tooltipGetWidth = () => tooltip.getBoundingClientRect().width;
        this._tooltipGetHeight = () => tooltip.getBoundingClientRect().height;
        this._viewGetWidth = viewGetWidth;
        this._viewGetHeight = viewGetHeight;
        this._arrowHeight = arrowHeight;
        this._arrowGap = arrowGap;
    }

    /**
     *
     * Calculate the XYZ viewport coordinates for the tooltip's position and
     * the direction of its arrow.
     * 
     * How it works:
     * - Position the arrow near the focus ("end") of the selection. Assume this
     *   is most likely the last position of the user's cursor/input.
     * - Position the tooltip to center horizontally on the arrow.
     * - Position the tooltip below the selection (arrow pointing up) for LTR
     *   selections and above (arrow pointing down) for RTL selections.
     *
     * @param   selectionRect Selection rect.
     * @param   isRtlSelection Whether the selection was made from right-to-left
     *          such that the focus point is most likely at the top-left corner
     *          of the selection rect.
     * @return  Position
     */
    position(selectionRect: DOMRect, isRtlSelection: boolean): Position {
        let top: number;
        let left: number;
        let arrowDirection: ArrowDirection;

        // Set the initial arrow direction based on the selection direction.
        if (isRtlSelection && !isTouchDevice()) {
            arrowDirection = ArrowDirection.Down;
        } else {
            // For touch devices, position the tooltip below the selection to
            // avoid overlapping with the native copy/paste bar, which is
            // usually (but not always) rendered above the selection.
            arrowDirection = ArrowDirection.Up;
        }

        // Position the tooltip such that the arrow it is above or below the
        // selection and close to the end.
        // TODO: Consider renaming margin to horizontalMargin.
        const margin = Math.min(this._arrowGap, selectionRect.width);
        const tooltipWidth = this._tooltipGetWidth();
        // For touch devices, position the tooltip a little lower to avoid
        // overlapping with the native copy/paste bar.
        const touchScreenOffset = isTouchDevice() ? 10 : 0;
        const tooltipHeight = this._tooltipGetHeight();
        if (isRtlSelection) {
            left = selectionRect.left - tooltipWidth / 2 + margin;
        } else {
            left =
                selectionRect.left
                + selectionRect.width
                - tooltipWidth / 2
                - margin;
        }

        // Flip the arrow direction if the tooltip would appear above the top or
        // below the bottom of the view.
        if (
            selectionRect.top - tooltipHeight < 0
            && arrowDirection === ArrowDirection.Down
        ) {
            arrowDirection = ArrowDirection.Up;
        } else if (selectionRect.top + tooltipHeight > this._viewGetHeight()) {
            arrowDirection = ArrowDirection.Down;
        }

        if (arrowDirection === ArrowDirection.Up) {
            top =
                selectionRect.top +
                selectionRect.height +
                this._arrowHeight +
                touchScreenOffset;
        } else {
            top = selectionRect.top - tooltipHeight - this._arrowHeight;
        }

        // Make sure the tooltip is within the view.
        left = Math.max(left, 0);
        left = Math.min(left, this._viewGetWidth() - tooltipWidth);
        top = Math.max(top, 0);
        top = Math.min(top, this._viewGetHeight() - tooltipHeight);

        const zIndex = this._getZIndex(left, top);

        return {
            left,
            top,
            zIndex,
            arrowDirection,
        };
    }

    /**
     * Gets a z-index such that the tooltip at the xy-position (left, top) will
     * appear above any other content (i.e. closer to the viewer).
     *
     * @param left Horizontal offset from left edge of viewport.
     * @param top Vertical offset from top edge of viewport.
     * @return Max z-index.
     */
    _getZIndex(left: number, top: number) {
        if (document.elementsFromPoint === undefined) {
            // If this feature is unavailable, then fallback to an arbitrary
            // large number (2^15).
            return 32768;
        }

        const adderWidth = this._tooltipGetWidth();
        const adderHeight = this._tooltipGetHeight();

        // Find the z-index of all elements in the view for five positions
        // around the tooltip (left-top, left-bottom, middle-center, right-top,
        // right-bottom) and use the max.

        // Use unique elements so getComputedStyle is called the minimum amount
        // of times.
        const elements = new Set([
            ...document.elementsFromPoint(left, top),
            ...document.elementsFromPoint(left, top + adderHeight),
            ...document.elementsFromPoint(
                left + adderWidth / 2,
                top + adderHeight / 2,
            ),
            ...document.elementsFromPoint(left + adderWidth, top),
            ...document.elementsFromPoint(left + adderWidth, top + adderHeight),
        ]);

        const zIndexes = [...elements]
            .map(element => +getComputedStyle(element).zIndex)
            .filter(Number.isInteger);

        // Make sure the array contains at least one element otherwise
        // Math.max(...[]) results in -Infinity.
        if (!zIndexes.length) {
            zIndexes.push(0);
        }

        return Math.max(...zIndexes) + 1;
    }

    /**
     * Converts the (left, top) viewport coordinates into values relative to the
     * tooltips's nearest positioned ancestor (NPA).
     *
     * @param left Horizontal offset from left edge of viewport.
     * @param top Vertical offset from top edge of viewport.
     * @returns XY viewport coordinates for the tooltip's position.
     */
    _convertToRelativePosition(
        left: number,
        top: number,
    ): { left: number; top: number } {
        // The tooltip is usually a descendant of the body element and therefore
        // the NPA is the root html element. However, there is an edge case
        // where page styling may make the body element positioned.
        // See https://github.com/hypothesis/client/issues/487.
        const positionedAncestor = getNearestPositionedAncestor(this._tooltip);
        const ancestorRect = positionedAncestor.getBoundingClientRect();
        return {
            left: left - ancestorRect.left,
            top: top - ancestorRect.top,
        };
    }

    static fromSizable(
        tooltip: HTMLElement,
        view: SizableHTMLContainer,
    ): Positioner {
        return new SelectionEndPositioner(
            tooltip,
            () => view.innerWidth,
            () => view.innerHeight,
        );
    }
}

export {
    Positioner,
    SelectionEndPositioner,
    SelectionTopCenterPositioner,
};
