import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useSelection } from '../../../contexts/selection';
import { useShortcuts } from '../../../contexts/shortcuts';

const notFound: number = -1;

const useOpenShortcutIndex = (): number => {
    const { shortcuts } = useShortcuts();

    const [shortcutIndex, setShortcutIndex] = React.useState<number>(notFound);

    React.useEffect(() => {
        setShortcutIndex(shortcuts.findIndex(x => x.source.href === ''));
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
            if (shortcutIndex === notFound) {
                return newValue;
            }
            if (prev) {
                dispatchShortcuts({
                    type: 'clearShortcut',
                    // TODO(dnguyen0304): Add real implementation.
                    index: 2,
                });
            } else {
                if (range && shortcutIndex !== notFound) {
                    dispatchShortcuts({
                        type: 'setShortcut',
                        index: shortcutIndex,
                        newValue: {
                            source: {
                                href: 'Not Yet Implemented',
                            },
                            selectors: [],
                            heading: `Shortcut #${shortcutIndex + 1}`,
                            // TODO(dnguyen0304): Investigate using
                            //   Range.cloneContents().children to handle
                            //   formatting ranges containing multiple elements.
                            snippet: range?.toString(),
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
        if (shortcutIndex === notFound) {
            return 'No open shortcut slots';
        } else {
            return 'Star';
        }
    };

    return (
        <Tooltip
            title={getTooltipTitle()}
            placement='top'
        >
            <div>
                <IconButton
                    disabled={!isClicked && shortcutIndex === notFound}
                    onClick={handleClick}
                >
                    {isClicked ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
            </div>
        </Tooltip>
    );
};
