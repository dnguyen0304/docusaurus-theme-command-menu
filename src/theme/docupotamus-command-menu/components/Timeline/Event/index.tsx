import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import TouchRipple, { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Anchor from './Anchor';
import styles from './styles.module.css';
import Tag from './Tag';

const PADDING_TOP: React.CSSProperties['paddingTop'] = 'var(--space-m)';

const Layout = styled(Box)({
    position: 'relative',
    width: '100%',

    display: 'flex',
    justifyContent: 'flex-end',

    cursor: 'pointer',
    padding: `${PADDING_TOP} var(--space-s) var(--space-l) 0`,
    '&:hover': {
        backgroundColor: 'rgba(var(--docupotamus-color-grey-800-rgb), 0.05)',
        transition: 'background-color 0.1s',
    }
});

const StyledCard = styled(Box)({
    width: '80%',

    color: 'var(--docupotamus-color-grey-800)',
    fontFamily: 'var(--docupotamus-font-family)',
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
    readonly timelineMouseClientY: number;
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
        timelineMouseClientY,
    }: Props,
): JSX.Element {
    const rippleRef = React.useRef<TouchRippleActions>(null);

    const startRipple = (event: React.SyntheticEvent) => {
        if (!rippleRef.current) {
            return;
        }
        rippleRef.current.start(event);
    };

    const stopRipple = (event: React.SyntheticEvent) => {
        if (!rippleRef.current) {
            return;
        }
        rippleRef.current?.stop(event);
    };

    return (
        <Layout
            onMouseDown={startRipple}
            onMouseUp={stopRipple}
        >
            <Anchor
                lineNotColoredBackgroundColor={lineNotColoredBackgroundColor}
                linePositionLeft={linePositionLeft}
                lineWidthPx={lineWidthPx}
                eventPaddingTop={PADDING_TOP}
                timelineMouseClientY={timelineMouseClientY}
            />
            <StyledCard component='section'>
                <StyledCardHeader component='header'>
                    <h2
                        className='ifm_text__reset'
                        style={{
                            fontSize: 'var(--font-size--1)',
                            fontWeight: 'var(--docupotamus-heading-font-weight)',
                            letterSpacing: '2px',
                            marginBottom: 'var(--space-2xs)',
                        }}
                    >
                        {heading}
                    </h2>
                    <Box>{timestampMilli}</Box>
                </StyledCardHeader>
                <p
                    className='ifm_text__reset'
                    style={{
                        fontSize: 'var(--docupotamus-font-size)',
                        fontWeight: 200,
                        marginBottom: 'var(--space-xs)',
                    }}
                >
                    {snippet}
                </p>
                {/* TODO(dnguyen0304): Fix onClick bubbling propagation. */}
                <Tag label={type} />
            </StyledCard>
            <TouchRipple
                ref={rippleRef}
                center={false}
                classes={{
                    child: styles.MuiTouchRipple_childOverride,
                }}
            />
        </Layout>
    );
};
