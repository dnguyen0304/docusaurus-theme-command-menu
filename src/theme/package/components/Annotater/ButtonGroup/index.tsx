import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import StarButton from './StarButton';

const StyledTooltip = styled(Box)({
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    zIndex: 'calc(var(--ifm-z-index-fixed) + 1)',

    display: 'flex',
    alignItems: 'center',

    backgroundColor: 'var(--cm-annotater-color-background)',
    borderRadius: '8px',
    padding: '6px 10px',
    transition: '0.2s all',
    '&::after': {
        content: '""',
        width: 0,
        height: 0,

        position: 'absolute',
        bottom: '-5px',
        left: '50%',
        transform: 'translateX(-50%)',

        borderTop: '6px solid var(--cm-annotater-color-background)',
        borderRight: '6px solid transparent',
        borderLeft: '6px solid transparent',
    },
});

interface Props {
    readonly isVisible: boolean;
    readonly positionTopPx: number;
    readonly positionLeftPx: number;
    readonly starIsClicked: boolean;
    readonly starOnClick: () => void;
};

export default function ButtonGroup(
    {
        isVisible,
        positionTopPx,
        positionLeftPx,
        starIsClicked,
        starOnClick,
    }: Props,
): JSX.Element {
    return (
        <StyledTooltip
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
        </StyledTooltip>
    );
};
