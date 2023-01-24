import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Anchor from './Anchor';

const HEADING_FONT_SIZE: React.CSSProperties['fontSize'] =
    'var(--font-size--1)';

const Layout = styled(Box)({
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
                headingFontSize={HEADING_FONT_SIZE}
            />
            <StyledCard component='section'>
                <h2
                    className='ifm_text__reset'
                    style={{
                        fontSize: HEADING_FONT_SIZE,
                        fontWeight: 'var(--docupotamus-heading-font-weight)',
                        letterSpacing: '2px',
                    }}
                >
                    {heading}
                </h2>
                <p className='ifm_text__reset'>{snippet}</p>
                <Box>{type}</Box>
                <Box>{timestampMilli}</Box>
            </StyledCard>
        </Layout>
    );
};
