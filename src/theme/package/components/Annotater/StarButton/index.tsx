import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useShortcuts } from '../../../contexts/shortcuts';

const useOpenShortcutIndex = (): number | undefined => {
    const { shortcuts } = useShortcuts();

    const [openShortcutIndex, setOpenShortcutIndex] =
        React.useState<number | undefined>();

    React.useEffect(() => {
        const index = shortcuts.findIndex(x => x.href === '');
        setOpenShortcutIndex((index !== -1) ? index : undefined);
    }, [shortcuts]);

    return openShortcutIndex;
};

export default function StarButton(): JSX.Element {
    const openShortcutIndex = useOpenShortcutIndex();

    const [isClicked, setIsClicked] = React.useState<boolean>(false);

    const handleClick = () => {
        // const selection = window.getSelection();
        // if (!selection || !selection.rangeCount) {
        //     return;
        // }
        // const range = selection.getRangeAt(0);
        // let spanElement = document.createElement('span');
        // spanElement.appendChild(range.extractContents());
        // range.insertNode(spanElement);
        // selection.removeAllRanges();
        setIsClicked(prev => !prev);
    };

    const getTooltipTitle = (): string => {
        if (isClicked) {
            return 'Unstar';
        }
        if (openShortcutIndex !== undefined) {
            return 'Star';
        } else {
            return 'No open shortcut slots';
        }
    };

    return (
        <Tooltip
            title={getTooltipTitle()}
            placement='top'
        >
            <div>
                <IconButton
                    disabled={!isClicked && openShortcutIndex === undefined}
                    onClick={handleClick}
                >
                    {isClicked ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
            </div>
        </Tooltip>
    );
};
