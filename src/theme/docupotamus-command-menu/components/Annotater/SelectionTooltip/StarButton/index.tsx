import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import tooltipStyles from '../styles.module.css';

interface Props {
    readonly onClick: () => void;
};

export default function StarButton(
    {
        onClick
    }: Props
): JSX.Element {
    const [isStarred, setIsStarred] = React.useState<boolean>(false);

    const handleClick = () => {
        onClick();
        setIsStarred(prev => !prev);
    };

    return (
        <Tooltip
            title='Star'
            placement='top'
            arrow
        >
            <IconButton
                className={tooltipStyles.Button}
                onClick={handleClick}
            >
                {isStarred ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
        </Tooltip>
    );
};
