import { SlotData } from '@docusaurus/theme-command-menu';
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

    color: 'white',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Wheel({ sx }: Props): JSX.Element {
    // TODO(dnguyen0304): Fix missing responsive design.
    // TODO(dnguyen0304): Investigate changing to use vmax or vmin so width and
    //   height are relative to the same unit.
    const slots: SlotData[] = [
        {
            description: '',
            heading: 'Heading',
            snippet: 'Snippet',
            sx: { translate: '0 -80%' }
        },
        {
            description: '',
            heading: 'Heading',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            sx: { translate: '130% -30%' }
        },
        {
            description: '',
            heading: 'Heading',
            snippet: 'Snippet',
            sx: { translate: '70% 90%' }
        },
        {
            description: '',
            heading: 'Heading',
            snippet: 'Snippet',
            sx: { translate: '-70% 90%' }
        },
        {
            description: '',
            heading: 'Heading',
            snippet: 'Snippet',
            sx: { translate: '-130% -30%' }
        },
    ];

    return (
        <StyledBox sx={{ ...sx }}>
            {slots.map((slot, index) => (
                <Slot
                    index={index}
                    description={slot.description}
                    heading={slot.heading}
                    snippet={slot.snippet}
                    sx={slot.sx}
                />
            ))}
        </StyledBox>
    );
};
