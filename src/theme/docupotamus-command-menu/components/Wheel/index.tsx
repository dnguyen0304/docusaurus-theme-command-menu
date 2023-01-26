import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { useWheel } from '../../contexts/wheel';
import Slot from './Slot';

const StyledBox = styled(Box)({
    // TODO(dnguyen0304): Fix missing responsive design.
    width: '25%',
    minWidth: '100px',
    aspectRatio: '3 / 2.5',

    position: 'relative',
    placeSelf: 'center',

    color: 'white',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Wheel({ sx }: Props): JSX.Element {
    const { slots } = useWheel();

    return (
        <StyledBox sx={{ ...sx }}>
            {slots.map((slot, index) => (
                <Slot
                    key={`slot-${index}`}
                    index={index}
                    heading={slot.heading}
                    snippet={slot.snippet}
                    sx={slot.sx}
                    href={slot.href}
                />
            ))}
        </StyledBox>
    );
};
