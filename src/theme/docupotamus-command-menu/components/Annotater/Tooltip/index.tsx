import Box from '@mui/material/Box';
import * as React from 'react';
import StarButton from './StarButton';
import styles from './styles.module.css';

interface Props {
    readonly isVisible: boolean;
    readonly onClick: () => void;
    readonly positionTopPx: number;
    readonly positionLeftPx: number;
};

export default function Tooltip(
    {
        isVisible,
        onClick,
        positionTopPx,
        positionLeftPx,
    }: Props,
): JSX.Element {
    return (
        <Box
            className={styles.Tooltip}
            sx={{
                top: `${positionTopPx}px`,
                left: `${positionLeftPx}px`,
                visibility: isVisible ? 'visible' : 'hidden',
            }}
        // onMouseDown={e => e.preventDefault()}
        // role='presentation'
        >
            <StarButton onClick={onClick} />
        </Box>
    );
};
