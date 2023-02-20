import * as React from 'react';
import { useSelection } from '../../contexts/selection';
import { SelectionTopCenterPositioner } from '../../services/annotate/tooltip/positioner';
import * as rangeUtils from '../../services/annotate/utils/range'; /* TODO(dnguyen0304): Fix missing type declaration. */
import ButtonGroup from './ButtonGroup';

export default function Annotater(): JSX.Element {
    const { range } = useSelection();

    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [positionTopPx, setPositionTopPx] = React.useState<number>(0);
    const [positionLeftPx, setPositionLeftPx] = React.useState<number>(0);
    const [starIsClicked, setStarIsClicked] = React.useState<boolean>(false);

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

    React.useEffect(() => {
        if (range) {
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
        } else {
            setIsVisible(false);
        }
    }, [range]);

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
