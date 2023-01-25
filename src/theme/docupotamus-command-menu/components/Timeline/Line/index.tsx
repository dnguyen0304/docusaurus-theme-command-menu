import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';

const NotColored = styled(Box)({
    position: 'absolute',
    zIndex: 10,
});

const Colored = styled(Box)({
    width: '100%',

    zIndex: 20,

    background: `linear-gradient(
        to bottom,
        rgb(98, 0, 234),
        rgb(236, 64, 122)
    )`,
});

interface Props {
    readonly coloredHeightPx: number;
    readonly sx?: SxProps<Theme>;
};

export default function Line(
    {
        coloredHeightPx,
        sx,
    }: Props
): JSX.Element {
    return (
        <NotColored sx={{ ...sx }}>
            <Colored sx={{ height: `${coloredHeightPx}px` }} />
        </NotColored>
    );
};
