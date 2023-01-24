import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';

const NotColored = styled(Box)({
    width: '4px',

    position: 'absolute',

    backgroundColor: 'rgba(var(--docupotamus-color-grey-800-rgb), 0.1)',
});

const Colored = styled(Box)({
    width: '100%',
    // TODO(dnguyen0304): Add dynamic effect.
    height: '200px',

    background: `linear-gradient(
        to bottom,
        rgb(98, 0, 234),
        rgb(236, 64, 122)
    )`,
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Line(
    {
        sx,
    }: Props
): JSX.Element {
    return (
        <NotColored sx={{ ...sx }}>
            <Colored />
        </NotColored>
    );
};
