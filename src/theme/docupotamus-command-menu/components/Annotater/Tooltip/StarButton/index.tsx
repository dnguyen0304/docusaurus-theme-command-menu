import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

interface Props {
    readonly onClick: () => void;
};

export default function StarButton(
    {
        onClick
    }: Props
): JSX.Element {
    const [isClicked, setIsClicked] = React.useState<boolean>(false);

    const handleClick = () => {
        onClick();
        setIsClicked(prev => !prev);
    };

    return (
        <Tooltip
            title='Star'
            placement='top'
            arrow
        >
            <IconButton
                onClick={handleClick}
                sx={{ color: 'white' }}
            >
                {isClicked ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
        </Tooltip>
    );
};
