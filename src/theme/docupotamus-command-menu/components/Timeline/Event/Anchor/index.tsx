import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

interface StyledBoxProps {
    readonly linePositionLeft: React.CSSProperties['left'];
    readonly size: React.CSSProperties['width' | 'height'];
};

const StyledBox = styled(Box)<StyledBoxProps>(({ size }) => ({
    width: size,
    height: size,

    border: '3px solid var(--docupotamus-color-grey-800)',
    borderRadius: '50%',
}));

interface Props {
    linePositionLeft: React.CSSProperties['left'];
};

export default function Event(
    {
        linePositionLeft,
    }: Props,
): JSX.Element {
    return (
        <StyledBox
            linePositionLeft={linePositionLeft}
            size='var(--font-size--1)'
        />
    );
};
