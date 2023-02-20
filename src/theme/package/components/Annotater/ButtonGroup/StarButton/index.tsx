import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useShortcuts } from '../../../../contexts/shortcuts';

const useHasOpenShortcut = (): boolean => {
    const { shortcuts } = useShortcuts();

    const [hasOpenShortcut, setHasOpenShortcut] =
        React.useState<boolean>(false);

    React.useEffect(() => {
        setHasOpenShortcut(shortcuts.some(shortcut => shortcut.href === ''));
    }, [shortcuts]);

    return hasOpenShortcut;
};

interface Props {
    readonly isClicked: boolean;
    readonly onClick: () => void;
};

export default function StarButton(
    {
        isClicked,
        onClick
    }: Props
): JSX.Element {
    const hasOpenShortcut = useHasOpenShortcut();

    const getTooltipTitle = (): string => {
        if (isClicked) {
            return 'Unstar';
        }
        if (hasOpenShortcut) {
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
                    disabled={!isClicked && !hasOpenShortcut}
                    onClick={onClick}
                >
                    {isClicked ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
            </div>
        </Tooltip>
    );
};
