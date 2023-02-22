import { RangeAnchor } from '@docupotamus/docusaurus-lib-common/annotate/anchor';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import URI from 'urijs';
import { SEARCH_PARAM_SELECTOR_ENCODED } from '../../../constants';
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
    const { dispatchShortcuts, intersectedShortcutIndex } = useShortcuts();

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
        if (isClicked) {
            // By definition, this can never happen and is only for TypeScript.
            if (intersectedShortcutIndex === undefined) {
                return;
            }
            dispatchShortcuts({
                type: 'clearShortcut',
                index: intersectedShortcutIndex,
            });
        } else {
            if (!range || shortcutIndex === notFound) {
                return;
            }
            // TODO(dnguyen0304): Extract to a centralized location to
            //   facilitate maintenance.
            const selector = new RangeAnchor(document.body, range).toSelector();
            const selectorEncoded = btoa(JSON.stringify(selector));
            const href =
                new URI()
                    .addSearch(
                        SEARCH_PARAM_SELECTOR_ENCODED,
                        selectorEncoded)
                    .toString();
            const hrefUserFriendly =
                new URI()
                    // TODO(dnguyen0304): Investigate removing all
                    //   search params.
                    .removeSearch(SEARCH_PARAM_SELECTOR_ENCODED)
                    .toString();
            dispatchShortcuts({
                type: 'setShortcut',
                index: shortcutIndex,
                newValue: {
                    source: {
                        href,
                        hrefUserFriendly,
                    },
                    selectors: [selector],
                    heading: `Shortcut #${shortcutIndex + 1}`,
                    // TODO(dnguyen0304): Investigate using
                    //   Range.cloneContents().children to handle
                    //   formatting ranges containing multiple elements.
                    snippet: range?.toString(),
                },
            });
        }
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

    React.useEffect(() => {
        setIsClicked(intersectedShortcutIndex !== undefined);
    }, [intersectedShortcutIndex])

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
