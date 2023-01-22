import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import Slot from './Slot';

const StyledBox = styled(Box)({
    // TODO(dnguyen0304): Fix missing responsive design.
    width: '15%',
    minWidth: '100px',
    aspectRatio: '2.5 / 3',

    position: 'relative',
    placeSelf: 'center',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Wheel({ sx }: Props): JSX.Element {
    // TODO(dnguyen0304): Fix missing responsive design.
    // TODO(dnguyen0304): Investigate changing to use vmax or vmin so width and
    //   height are relative to the same unit.
    const slots = [
        { sx: { translate: '0 -100%' } },
        { sx: { translate: '150% -30%' } },
        { sx: { translate: '80% 100%' } },
        { sx: { translate: '-80% 100%' } },
        { sx: { translate: '-150% -30%' } },
    ];

    return (
        <StyledBox sx={{ ...sx }}>
            {slots.map((slot, index) => <Slot index={index} sx={slot.sx} />)}
        </StyledBox>
    );
};
