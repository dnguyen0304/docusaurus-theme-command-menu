import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';

const NotColored = styled(Box)({
    position: 'absolute',
});

const Colored = styled(Box)({
    width: '100%',

    background: `linear-gradient(
        to bottom,
        var(--cm-color-base),
        var(--cm-line-color-background)
    )`,
});

interface Props {
    // TODO(dnguyen0304): Fix coloredHeightPx being greater than
    //   notColoredHeightPx.
    readonly coloredHeightPx: number;
    readonly sx?: SxProps<Theme>;
};

// TODO(dnguyen0304): Fix NotColored height not being long enough to reach the
//   bottom of the container and instead stopping at padding-bottom.
export default function Line(
    {
        coloredHeightPx,
        sx,
    }: Props
): JSX.Element {
    return (
        <NotColored sx={sx}>
            <Colored sx={{ height: `${coloredHeightPx}px` }} />
        </NotColored>
    );
};
