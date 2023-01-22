import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';

const StyledBox = styled(Box)({
    // TODO(dnguyen0304): Fix missing responsive design.
    width: '15%',
    minWidth: '100px',
    aspectRatio: '2.5 / 3.5',
    placeSelf: 'center',

    // TODO(dnguyen0304): Remove development code.
    backgroundColor: 'red',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Wheel({ sx }: Props): JSX.Element {
    return (
        <StyledBox sx={{ ...sx }}>
            Wheel
        </StyledBox>
    );
};
