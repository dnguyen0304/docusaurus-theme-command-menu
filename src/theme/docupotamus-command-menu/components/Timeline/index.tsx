import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import Events from './Events';
import Line from './Line';

const StyledContainer = styled(Box)({
    // TODO(dnguyen0304): Investigate why this or z-index: 0 is needed for the
    //   timeline to be visible.
    position: 'relative',

    backgroundColor: 'var(--docupotamus-color-grey-100)',
    margin: 'var(--space-s)',
    marginLeft: 0,
    overflowY: 'auto',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Timeline({ sx }: Props): JSX.Element {
    // Assume events are sorted by timestampMilli in ascending order.
    const events: TimelineEventData[] = [
        {
            timestampMilli: 1049231539000,
            type: 'Read Recently',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            timestampMilli: 1114786958000,
            type: 'Read Recently',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
        },
        {
            timestampMilli: 1190397622000,
            type: 'Read Recently',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            timestampMilli: 1192149658000,
            type: 'Read Recently',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            timestampMilli: 1257131006000,
            type: 'Read Recently',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
        },
        {
            timestampMilli: 1367703939000,
            type: 'Read Recently',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            timestampMilli: 1400229158000,
            type: 'Read Recently',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
        },
        {
            timestampMilli: 1530712788000,
            type: 'Read Recently',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            timestampMilli: 1613816700000,
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
            <Events events={events} />
        </StyledContainer>
    );
};
