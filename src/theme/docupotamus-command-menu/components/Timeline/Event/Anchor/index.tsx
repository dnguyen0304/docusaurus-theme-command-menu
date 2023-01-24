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

interface Props {
    linePositionLeft: React.CSSProperties['left'];
    lineWidthPx: number;
};

export default function Event(
    {
        linePositionLeft,
        lineWidthPx,
    }: Props,
): JSX.Element {
    return (
        <StyledBox size='var(--font-size--1)' />
    );
};
