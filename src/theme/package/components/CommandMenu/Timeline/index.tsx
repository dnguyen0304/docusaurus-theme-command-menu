import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { FOOTER_HEIGHT, TILE_BORDER_WIDTH_PX } from '../../../constants';
import { useTimeline } from '../../../contexts/timeline';
import useDomRect from '../../../hooks/useDomRect';
import Event from './Event';
import Line from './Line';

const LINE_WIDTH_PX: number = 4;
const LINE_POSITION_LEFT: React.CSSProperties['left'] = 'var(--d9s-space-l)';
const LINE_NOT_COLORED_BACKGROUND_COLOR: React.CSSProperties['backgroundColor'] =
    'var(--cm-color-background-lighter)';

const Z_INDEX = {
    heading: 10,
    line: 20,
    eventAnchor: 30,
};

const StyledContainer = styled(Box)({
    // TODO(dnguyen0304): Investigate why this or z-index: 0 is needed for the
    //   timeline to be visible.
    position: 'relative',

    backgroundColor: 'var(--cm-color-background)',
    margin: `${2 * TILE_BORDER_WIDTH_PX}px`,
    marginLeft: 0,
    overflowY: 'auto',
});

const StyledHeading = (): JSX.Element => {
    return (
        <h2
            // style overrides className overrides styled-components.
            className='ifm_text__reset'
            style={{
                position: 'sticky',
                top: 0,
                zIndex: Z_INDEX.heading,

                backgroundColor: 'var(--cm-color-background)',
                color: 'var(--docupotamus-color-grey-800)',
                fontFamily: 'var(--docupotamus-font-family)',
                fontSize: 'var(--font-size-1)',
                fontWeight: 'var(--docupotamus-heading-font-weight)',
                letterSpacing: '4px',
                lineHeight: '1.2',
                padding: 'var(--space-l) 0 var(--space-m)',
                textAlign: 'center',
                textTransform: 'uppercase',
            }}
        >
            Timeline
        </h2>
    );
};

const StickyFooter = styled(Box)({
    height: FOOTER_HEIGHT,

    position: 'sticky',
    bottom: 0,

    backgroundColor: 'hsla(var(--cm-color-background-hsl), 0.9)',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Timeline({ sx }: Props): JSX.Element {
    const { events } = useTimeline();

    const [lineHeight, setLineHeight] = React.useState<number>(0);
    const [lineColoredHeightPx, setLineColoredHeightPx] =
        React.useState<number>(0);
    const [mouseClientY, setMouseClientY] = React.useState<number>(0);

    const timelineRef = React.useRef<HTMLDivElement>(null);
    const eventsLayoutRef = React.useRef<HTMLDivElement>(null);
    const domRect = useDomRect<HTMLDivElement>(eventsLayoutRef);

    const handleMouseLeave = () => {
        setLineColoredHeightPx(0);
    };

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (!timelineRef.current) {
            return;
        }
        const newHeight =
            timelineRef.current.scrollTop
            + event.clientY
            - timelineRef.current.getBoundingClientRect().top;
        setLineColoredHeightPx((newHeight > 0) ? newHeight : 0);
        setMouseClientY(event.clientY);
    };

    // TODO(dnguyen0304): Investigate if this can be done in CSS.
    React.useEffect(() => {
        if (domRect === undefined) {
            return;
        }
        setLineHeight(domRect.height);
    }, [domRect]);

    return (
        <StyledContainer
            ref={timelineRef}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            sx={{ ...sx }}
        >
            <Line
                coloredHeightPx={lineColoredHeightPx}
                sx={{
                    width: `${LINE_WIDTH_PX}px`,
                    height: lineHeight,
                    left: LINE_POSITION_LEFT,
                    zIndex: Z_INDEX.line,
                    backgroundColor: LINE_NOT_COLORED_BACKGROUND_COLOR,
                }}
            />
            {/* TODO(dnguyen0304): Investigate adding a footer indicating the
                end of the timeline or a way to load more events. */}
            <Box ref={eventsLayoutRef}>
                <StyledHeading />
                {events
                    .sort((x, y) => y.timestampMilli - x.timestampMilli)
                    .map((event) =>
                        <Event
                            key={event.timestampMilli}
                            timestampMilli={event.timestampMilli}
                            type={event.type}
                            heading={event.heading}
                            snippet={event.snippet}
                            href={event.href}
                            anchorZIndex={Z_INDEX.eventAnchor}
                            lineNotColoredBackgroundColor={
                                LINE_NOT_COLORED_BACKGROUND_COLOR
                            }
                            linePositionLeft={LINE_POSITION_LEFT}
                            lineWidthPx={LINE_WIDTH_PX}
                            timelineMouseClientY={mouseClientY}
                        />
                    )
                }
            </ Box>
            <StickyFooter />
        </StyledContainer>
    );
};
