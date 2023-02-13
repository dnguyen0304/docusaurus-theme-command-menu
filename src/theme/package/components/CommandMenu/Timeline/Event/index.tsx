import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import TouchRipple, { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useAddressBar } from '../../../../contexts/address-bar';
import { dayjs } from '../../../../services/datetime';
import stylesCommon from '../../../styles.module.css';
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
        backgroundColor: 'hsla(var(--ifm-color-white-hsl), 0.05)',
        transition: `
            background-color
            0.1s
            var(--ifm-transition-timing-default)
        `,
    }
});

const StyledCard = styled(Box)({
    width: '80%',
});

const StyledCardHeader = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',

    marginBottom: 'var(--space-2xs)',
});

interface Props extends TimelineEventData {
    readonly anchorZIndex: React.CSSProperties['zIndex'];
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
        href,
        anchorZIndex,
        lineNotColoredBackgroundColor,
        linePositionLeft,
        lineWidthPx,
        timelineMouseClientY,
    }: Props,
): JSX.Element {
    const { setHref } = useAddressBar();

    const rippleRef = React.useRef<TouchRippleActions>(null);

    const startRipple = (event: React.SyntheticEvent) => {
        rippleRef.current?.start(event);
    };

    const stopRipple = (event: React.SyntheticEvent) => {
        // TODO(dnguyen0304): Fix missing SSR defensive coding.
        window.open(href, '_blank');
        rippleRef.current?.stop(event);
    };

    return (
        <Layout
            onMouseEnter={() => setHref(href)}
            onMouseLeave={() => setHref('')}
            onMouseDown={startRipple}
            onMouseUp={stopRipple}
        >
            <Anchor
                zIndex={anchorZIndex}
                lineNotColoredBackgroundColor={lineNotColoredBackgroundColor}
                linePositionLeft={linePositionLeft}
                lineWidthPx={lineWidthPx}
                eventPaddingTop={PADDING_TOP}
                timelineMouseClientY={timelineMouseClientY}
            />
            <StyledCard
                className={styles.Event_cardText}
                component='section'
            >
                <StyledCardHeader component='header'>
                    <span className={`ifm_text__reset ${styles.Event_heading}`}>
                        {heading}
                    </span>
                    {/* TODO(dnguyen0304): Add tooltip. */}
                    {/* TODO(dnguyen0304): Remove time ago formatting for
                          certain ranges such as greater than 1 day and less
                          than 1 week. */}
                    <span className={styles.Event_timestamp}>
                        {dayjs(timestampMilli).fromNow()}
                    </span>
                </StyledCardHeader>
                <p className={
                    `${stylesCommon.text} ${stylesCommon.textBody}`
                } >
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
