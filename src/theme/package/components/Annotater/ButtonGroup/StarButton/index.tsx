import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

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
    return (
        <Tooltip
            title={isClicked ? 'Unstar' : 'Star'}
            placement='top'
            arrow
        >
            <IconButton
                onClick={onClick}
                sx={{ color: 'var(--cm-annotater-color)' }}
            >
                {isClicked ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
        </Tooltip>
    );
};
