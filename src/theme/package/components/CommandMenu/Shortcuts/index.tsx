import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { useShortcuts } from '../../../contexts/shortcuts';
import Slot from './Slot';

const StyledBox = styled(Box)({
    // TODO(dnguyen0304): Fix missing responsive design.
    width: '25%',
    minWidth: '100px',
    aspectRatio: '3 / 2.5',

    position: 'relative',
    placeSelf: 'center',

    color: 'var(--cm-color-base)',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Shortcuts({ sx }: Props): JSX.Element {
    const { slots } = useShortcuts();

    return (
        <StyledBox sx={sx}>
            {slots.map((slot, index) => (
                <Slot
                    key={`slot-${index}`}
                    index={index}
                    heading={slot.heading}
                    snippet={slot.snippet}
                    href={slot.href}
                />
            ))}
        </StyledBox>
    );
};
