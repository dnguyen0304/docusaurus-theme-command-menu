import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Event from './Event';
import Line from './Line';

const Layout = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
});

interface Props {
    readonly events: readonly TimelineEventData[];
};

export default function Events(
    {
        events,
    }: Props
): JSX.Element {
    return (
        <Layout>
            <Line />
            {[...events]
                .sort((x, y) => y.timestampMilli - x.timestampMilli)
                .map(({ timestampMilli, type, heading, snippet }) =>
                    <Event
                        key={timestampMilli}
                        timestampMilli={timestampMilli}
                        type={type}
                        heading={heading}
                        snippet={snippet}
                    />
                )
            }
        </ Layout>
    );
};
