import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

interface StyledBoxProps {
    readonly size: React.CSSProperties['width' | 'height'];
};

const StyledBox = styled(Box)<StyledBoxProps>(({ size }) => ({
    width: size,
    height: size,

    border: '3px solid var(--docupotamus-color-grey-800)',
    borderRadius: '50%',
}));

const getPosition = (
    linePositionLeft: React.CSSProperties['left'],
    lineWidthPx: number,
): Pick<React.CSSProperties, 'position' | 'left' | 'translate'> => {
    return {
        position: 'absolute',
        left: linePositionLeft,
        translate: `calc(-50% + ${lineWidthPx / 2}px) 0`,
    };
};

interface Props {
    lineNotColoredBackgroundColor: React.CSSProperties['backgroundColor'];
    linePositionLeft: React.CSSProperties['left'];
    lineWidthPx: number;
};

export default function Event(
    {
        lineNotColoredBackgroundColor,
        linePositionLeft,
        lineWidthPx,
    }: Props,
): JSX.Element {
    return (
        <StyledBox
            size='var(--font-size--1)'
            sx={getPosition(linePositionLeft, lineWidthPx)}
        />
    );
};
