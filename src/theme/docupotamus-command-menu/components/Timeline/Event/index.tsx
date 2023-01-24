import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledCard = styled(Box)({
    width: '80%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    borderRadius: 'var(--space-m)',
    color: 'var(--docupotamus-color-grey-800)',
    fontFamily: 'var(--docupotamus-font-family)',
    fontSize: 'var(--docupotamus-font-size)',
    fontWeight: 'var(--docupotamus-body-font-weight)',
    lineHeight: '1.2',
});

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
        <Box sx={{ width: '100%' }}>
            <Box sx={{
                width: '10px',
                height: '10px',
                border: '2px solid blue',
                borderRadius: '50%',
            }} />
            <StyledCard component='section'>
                <h2>{heading}</h2>
                <p>{snippet}</p>
                <Box>{type}</Box>
                <Box>{timestampMilli}</Box>
            </StyledCard>
        </Box>
    );
};
