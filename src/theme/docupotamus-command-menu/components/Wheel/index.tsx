import { SlotData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
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
    // TODO(dnguyen0304): Fix missing responsive design.
    // TODO(dnguyen0304): Investigate changing to use vmax or vmin so width and
    //   height are relative to the same unit.
    const slots: SlotData[] = [
        {
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
            sx: { translate: '0 -80%' }
        },
        {
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et nisl fermentum, interdum ex nec, dignissim ipsum. Suspendisse potenti. Vivamus tempus tincidunt elit nec efficitur. Ut accumsan sem vel ex pellentesque, id faucibus augue dignissim. Nulla facilisi. Cras dapibus orci sed pulvinar sollicitudin.',
            sx: { translate: '130% -30%' }
        },
        {
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
            sx: { translate: '70% 90%' }
        },
        {
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
            sx: { translate: '-70% 90%' }
        },
        {
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
            sx: { translate: '-130% -30%' }
        },
    ];

    return (
        <StyledBox sx={{ ...sx }}>
            {slots.map((slot, index) => (
                <Slot
                    key={`slot-${index}`}
                    heading={slot.heading}
                    snippet={slot.snippet}
                    sx={slot.sx}
                />
            ))}
        </StyledBox>
    );
};
