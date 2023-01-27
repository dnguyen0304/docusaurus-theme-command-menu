import Box from '@mui/material/Box';
import * as React from 'react';
import StarButton from './StarButton';
import styles from './styles.module.css';

interface Props {
    readonly isVisible: boolean;
    readonly positionTopPx: number;
    readonly positionLeftPx: number;
    readonly starIsClicked: boolean;
    readonly starOnClick: () => void;
};

export default function Tooltip(
    {
        isVisible,
        positionTopPx,
        positionLeftPx,
        starIsClicked,
        starOnClick,
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
            <StarButton
                isClicked={starIsClicked}
                onClick={starOnClick}
            />
        </Box>
    );
};
