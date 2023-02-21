import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useSelection } from '../../../contexts/selection';
import { useShortcuts } from '../../../contexts/shortcuts';

const useOpenShortcutIndex = (): number | undefined => {
    const { shortcuts } = useShortcuts();

    const [shortcutIndex, setShortcutIndex] =
        React.useState<number | undefined>();

    React.useEffect(() => {
        const index = shortcuts.findIndex(x => x.href === '');
        setShortcutIndex((index !== -1) ? index : undefined);
    }, [shortcuts]);

    return shortcutIndex;
};

export default function StarButton(): JSX.Element {
    const shortcutIndex = useOpenShortcutIndex();
    const { range } = useSelection();
    const { dispatchShortcuts } = useShortcuts();

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
        setIsClicked(prev => {
            const newValue = !prev;
            if (prev) {
                // TODO(dnguyen0304): Add real implementation.
            } else {
                if (range && shortcutIndex) {
                    dispatchShortcuts({
                        type: 'setShortcut',
                        index: shortcutIndex,
                        newValue: {
                            heading: `Shortcut #${shortcutIndex + 1}`,
                            // TODO(dnguyen0304): Investigate using
                            //   Range.cloneContents().children to handle
                            //   formatting ranges containing multiple elements.
                            snippet: range?.toString(),
                            href: 'Not Yet Implemented',
                        },
                    });
                }
            }
            return newValue;
        });
    };

    const getTooltipTitle = (): string => {
        if (isClicked) {
            return 'Unstar';
        }
        if (shortcutIndex !== undefined) {
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
                    disabled={!isClicked && shortcutIndex === undefined}
                    onClick={handleClick}
                >
                    {isClicked ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
            </div>
        </Tooltip>
    );
};
