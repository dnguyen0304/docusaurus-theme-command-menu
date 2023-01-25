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
    parentPaddingTop: React.CSSProperties['paddingTop'],
): Pick<React.CSSProperties, 'position' | 'top' | 'left' | 'translate'> => {
    return {
        position: 'absolute',
        // TODO(dnguyen0304): Investigate if this can be done programmatically.
        top: `calc(${parentPaddingTop} + 2px)`,
        left: linePositionLeft,
        translate: `calc(-50% + ${lineWidthPx / 2}px) 0`,
    };
};

interface Props {
    lineNotColoredBackgroundColor: React.CSSProperties['backgroundColor'];
    linePositionLeft: React.CSSProperties['left'];
    lineWidthPx: number;
    parentPaddingTop: React.CSSProperties['paddingTop'];
};

export default function Event(
    {
        lineNotColoredBackgroundColor,
        linePositionLeft,
        lineWidthPx,
        parentPaddingTop,
    }: Props,
): JSX.Element {
    return (
        <StyledBox
            size='var(--font-size--1)'
            sx={{
                ...getPosition(linePositionLeft, lineWidthPx, parentPaddingTop),
                backgroundColor: lineNotColoredBackgroundColor,
            }}
        />
    );
};
