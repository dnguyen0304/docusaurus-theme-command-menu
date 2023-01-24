import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import Event from './Event';
import Line from './Line';

const StyledEvents = styled(Box)({});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Timeline({ sx }: Props): JSX.Element {
    // 1192149658000
    // 1530712788000
    // 1613816700000
    // 1114786958000
    // 1367703939000
    // 1515359339000
    // 1016797395000
    // 1210554980000
    // 1653891149000
    // 1035680140000
    // 1471264494000
    // 1300759953000
    // 1020760682000
    // 1393178568000
    // 1188249780000
    // 1640174795000
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
        <Box sx={{ position: 'relative', backgroundColor: 'red', ...sx }}>
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
        </Box>
    );
};
