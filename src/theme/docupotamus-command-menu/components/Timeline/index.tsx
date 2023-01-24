import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import Event from './Event';
import Line from './Line';

const StyledContainer = styled(Box)({
    // TODO(dnguyen0304): Investigate why this or z-index: 0 is needed for the
    //   timeline to be visible.
    position: 'relative',

    // TODO(dnguyen0304): Remove development code.
    backgroundColor: 'red',
});

const StyledEvents = styled(Box)({});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Timeline({ sx }: Props): JSX.Element {
    const events: TimelineEventData[] = [
        {
            timestampMilli: 1049231539000,
            type: 'Read Recently',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            timestampMilli: 1190397622000,
            type: 'Read Recently',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
        },
        {
            timestampMilli: 1257131006000,
            type: 'Read Recently',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            timestampMilli: 1400229158000,
            type: 'Read Recently',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            timestampMilli: 1674576222000,
            type: 'Read Recently',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
        },
    ];

    return (
        <StyledContainer sx={{ ...sx }}>
            <Line />
            <StyledEvents>
                {events.map(({ timestampMilli, type, heading, snippet }) =>
                    <Event
                        key={timestampMilli}
                        timestampMilli={timestampMilli}
                        type={type}
                        heading={heading}
                        snippet={snippet}
                    />
                )}
            </ StyledEvents>
        </StyledContainer>
    );
};
