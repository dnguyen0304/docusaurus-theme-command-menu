import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import TouchRipple, { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useAddressBar } from '../../../../contexts/address-bar';
import { dayjs } from '../../../../services/datetime';
import Anchor from './Anchor';
import styles from './styles.module.css';
import Tag from './Tag';

const PADDING_TOP: React.CSSProperties['paddingTop'] = 'var(--d9s-space-s)';

const Layout = styled(Box)({
    position: 'relative',
    width: '100%',

    display: 'flex',
    justifyContent: 'flex-end',

    cursor: 'pointer',
    padding: `${PADDING_TOP} var(--d9s-space-s) var(--d9s-space-m) 0`,
    '&:hover': {
        backgroundColor: 'hsla(var(--cm-color-base-hsl), 0.05)',
        transition: 'var(--ifm-hover-overlay-transition)',
    }
});

const StyledCard = styled(Box)({
    ['--color-darker']: 'var(--ifm-color-gray-200)',
    ['--color-dimmer']: 'hsla(var(--cm-color-base-hsl), 0.8)',

    width: '80%',
});

const StyledCardHeader = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
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
            <StyledCard component='section'>
                <StyledCardHeader component='header'>
                    <span>
                        <h3 className={styles.Event_heading}>
                            {heading}
                        </h3>
                    </span>
                    {/* TODO(dnguyen0304): Add tooltip. */}
                    {/* TODO(dnguyen0304): Remove time ago formatting for
                          certain ranges such as greater than 1 day and less
                          than 1 week. */}
                    <span>
                        <p className={styles.Event_timestamp}>
                            {dayjs(timestampMilli).fromNow()}
                        </p>
                    </span>
                </StyledCardHeader>
                <p className={styles.Event_body}>
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
