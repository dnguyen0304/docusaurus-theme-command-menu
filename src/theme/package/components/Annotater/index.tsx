import * as React from 'react';
import ButtonGroup from './ButtonGroup';

export default function Annotater(): JSX.Element {
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

    return (
        <ButtonGroup
            starIsClicked={starIsClicked}
            starOnClick={starHandleClick}
        />
    );
};
