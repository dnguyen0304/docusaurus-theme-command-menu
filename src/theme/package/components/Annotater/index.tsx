import * as React from 'react';
import { SelectionObserver } from '../../services/annotate/selection-observer';
import { SelectionTopCenterPositioner } from '../../services/annotate/tooltip/positioner';
import * as rangeUtils from '../../services/annotate/utils/range';
import ButtonGroup from './ButtonGroup';

export default function Annotater(): JSX.Element {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [positionTopPx, setPositionTopPx] = React.useState<number>(0);
    const [positionLeftPx, setPositionLeftPx] = React.useState<number>(0);
    const [starIsClicked, setStarIsClicked] = React.useState<boolean>(false);

    const selectionObserverRef = React.useRef<SelectionObserver>(null);

    const starHandleClick = () => {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) {
            return;
        }
        const range = selection.getRangeAt(0);
        let spanElement = document.createElement('span');
        spanElement.appendChild(range.extractContents());
        range.insertNode(spanElement);
        selection.removeAllRanges();

        setStarIsClicked(prev => !prev);
    };

    const handleSelection = (_range: Range) => {
        const selection = document.getSelection()!;
        const focusRect = rangeUtils.selectionFocusRect(selection);
        if (!focusRect) {
            // The selected range does not contain any text.
            return;
        }
        const isBackwards = rangeUtils.isSelectionBackwards(selection);
        const { left, top } = new SelectionTopCenterPositioner().position(
            focusRect,
            isBackwards,
        );
        setIsVisible(true);
        setPositionTopPx(top);
        setPositionLeftPx(left);
    };

    const handleNoSelection = () => {
        setIsVisible(false);
    };

    React.useEffect(() => {
        selectionObserverRef.current = new SelectionObserver((
            range: Range | null,
        ) => {
            if (range) {
                handleSelection(range);
            } else {
                handleNoSelection();
            }
        });
    }, []);

    return (
        <ButtonGroup
            isVisible={isVisible}
            positionTopPx={positionTopPx}
            positionLeftPx={positionLeftPx}
            starIsClicked={starIsClicked}
            starOnClick={starHandleClick}
        />
    );
};
