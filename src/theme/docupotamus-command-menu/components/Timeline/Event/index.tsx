import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Anchor from './Anchor';

const Layout = styled(Box)({
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
});

const StyledCard = styled(Box)({
    width: '80%',

    borderRadius: 'var(--space-m)',
    color: 'var(--docupotamus-color-grey-800)',
    fontFamily: 'var(--docupotamus-font-family)',
    fontSize: 'var(--docupotamus-font-size)',
    fontWeight: 'var(--docupotamus-body-font-weight)',
    lineHeight: '1.2',
});

interface Props extends TimelineEventData {
    readonly linePositionLeft: React.CSSProperties['left'];
};

export default function Event(
    {
        timestampMilli,
        type,
        heading,
        snippet,
        linePositionLeft,
    }: Props,
): JSX.Element {
    return (
        <Layout>
            <Anchor linePositionLeft={linePositionLeft} />
            <StyledCard component='section'>
                <h2>{heading}</h2>
                <p>{snippet}</p>
                <Box>{type}</Box>
                <Box>{timestampMilli}</Box>
            </StyledCard>
        </Layout>
    );
};
