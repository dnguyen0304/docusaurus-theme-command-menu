import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import * as React from 'react';

interface Props extends TimelineEventData { };

export default function Event(
    {
        timestampMilli,
        type,
        heading,
        snippet,
    }: Props,
): JSX.Element {
    return (
        <Box>
            <Box sx={{
                width: '10px',
                height: '10px',
                border: '2px solid blue',
                borderRadius: '50%',
            }} />
            <Box component='section'>
                <h2>{heading}</h2>
                <p>{snippet}</p>
                <Box>{type}</Box>
                <Box>{timestampMilli}</Box>
            </Box>
        </Box>
    );
};
