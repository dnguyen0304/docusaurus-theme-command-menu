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
    // 1192149658
    // 1530712788
    // 1613816700
    // 1114786958
    // 1367703939
    // 1515359339
    // 1016797395
    // 1210554980
    // 1653891149
    // 1035680140
    // 1471264494
    // 1300759953
    // 1020760682
    // 1393178568
    // 1188249780
    // 1640174795
    const events: TimelineEventData[] = [
        {
            timestampMilli: 1674576222031,
            type: 'Read Recently',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
        },
        {
            timestampMilli: 1400229158,
            type: 'Read Recently',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            timestampMilli: 1049231539,
            type: 'Read Recently',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            timestampMilli: 1257131006,
            type: 'Read Recently',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            timestampMilli: 1190397622,
            type: 'Read Recently',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
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
