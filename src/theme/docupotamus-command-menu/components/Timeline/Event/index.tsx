import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Anchor from './Anchor';
import Tag from './Tag';

const Layout = styled(Box)({
    position: 'relative',
    width: '100%',

    display: 'flex',
    justifyContent: 'flex-end',
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

const StyledCardHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});

interface Props extends TimelineEventData {
    readonly lineNotColoredBackgroundColor: React.CSSProperties['backgroundColor'];
    readonly linePositionLeft: React.CSSProperties['left'];
    readonly lineWidthPx: number;
};

export default function Event(
    {
        timestampMilli,
        type,
        heading,
        snippet,
        lineNotColoredBackgroundColor,
        linePositionLeft,
        lineWidthPx,
    }: Props,
): JSX.Element {
    return (
        <Layout>
            <Anchor
                lineNotColoredBackgroundColor={lineNotColoredBackgroundColor}
                linePositionLeft={linePositionLeft}
                lineWidthPx={lineWidthPx}
            />
            <StyledCard component='section'>
                <StyledCardHeader component='header'>
                    <h2
                        className='ifm_text__reset'
                        style={{
                            fontSize: 'var(--font-size--1)',
                            fontWeight: 'var(--docupotamus-heading-font-weight)',
                            letterSpacing: '2px',
                            marginBottom: 'var(--space-xs)',
                        }}
                    >
                        {heading}
                    </h2>
                    <Box>{timestampMilli}</Box>
                </StyledCardHeader>
                <p
                    className='ifm_text__reset'
                    style={{
                        marginBottom: 'var(--space-xs)',
                    }}
                >
                    {snippet}
                </p>
                <Tag label={type} />
            </StyledCard>
        </Layout>
    );
};
