import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import Slot from './Slot';

const StyledBox = styled(Box)({
    // TODO(dnguyen0304): Fix missing responsive design.
    width: '15%',
    minWidth: '100px',
    aspectRatio: '2.5 / 3.5',

    position: 'relative',
    placeSelf: 'center',

    // TODO(dnguyen0304): Remove development code.
    backgroundColor: 'red',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Wheel({ sx }: Props): JSX.Element {
    const slots = [
        {},
        {},
        {},
        {},
        {},
    ];

    return (
        <StyledBox sx={{ ...sx }}>
            {slots.map((slot, index) => <Slot index={index} />)}
        </StyledBox>
    );
};
