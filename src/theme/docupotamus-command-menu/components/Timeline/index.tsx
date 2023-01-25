import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import useDomRect from '../../hooks/useDomRect';
import Event from './Event';
import Line from './Line';

const LINE_WIDTH_PX: number = 4;
const LINE_POSITION_LEFT: React.CSSProperties['left'] = 'var(--space-l)';
const LINE_NOT_COLORED_BACKGROUND_COLOR: React.CSSProperties['backgroundColor'] =
    'var(--docupotamus-color-grey-300)';

const Z_INDEX = {
    heading: 10,
    lineColored: 20,
    lineNotColored: 30,
    eventAnchor: 40,
};

const StyledContainer = styled(Box)({
    // TODO(dnguyen0304): Investigate why this or z-index: 0 is needed for the
    //   timeline to be visible.
    position: 'relative',

    backgroundColor: 'var(--docupotamus-color-grey-100)',
    margin: 'var(--space-s)',
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
                zIndex: Z_INDEX['heading'],

                backgroundColor: 'var(--docupotamus-color-grey-100)',
                color: 'var(--docupotamus-color-grey-800)',
                fontFamily: 'var(--docupotamus-font-family)',
                fontSize: 'var(--font-size-0)',
                fontWeight: 'var(--docupotamus-heading-font-weight)',
                letterSpacing: '4px',
                lineHeight: '1.2',
                padding: 'var(--space-l) 0',
                textAlign: 'center',
                textTransform: 'uppercase',
            }}
        >
            Timeline
        </h2>
    );
};

const EventsLayout = styled(Box)({
    // Use margin on the children instead of padding on the parent because we
    // programmatically get the size.
    '& > .MuiBox-root:last-of-type': {
        marginBottom: 'var(--space-l)',
    },
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Timeline({ sx }: Props): JSX.Element {
    const [lineHeight, setLineHeight] = React.useState<number>(0);
    const [lineColoredHeightPx, setLineColoredHeightPx] =
        React.useState<number>(0);
    const [mouseClientY, setMouseClientY] = React.useState<number>(0);

    const timelineRef = React.useRef<HTMLDivElement>();
    const eventsLayoutRef = React.useRef<HTMLDivElement>();
    const domRect = useDomRect<HTMLDivElement>(eventsLayoutRef);

    // Assume events are sorted by timestampMilli in ascending order.
    const events: TimelineEventData[] = [
        {
            timestampMilli: 1049231539000,
            type: 'Read',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            timestampMilli: 1114786958000,
            type: 'Read',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
        },
        {
            timestampMilli: 1190397622000,
            type: 'Read',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            timestampMilli: 1192149658000,
            type: 'Read',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            timestampMilli: 1257131006000,
            type: 'Read',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
        },
        {
            timestampMilli: 1367703939000,
            type: 'Read',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            timestampMilli: 1400229158000,
            type: 'Read',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
        },
        {
            timestampMilli: 1530712788000,
            type: 'Read',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            timestampMilli: 1613816700000,
            type: 'Read',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            timestampMilli: 1674576222000,
            type: 'Read',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
        },
    ];

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
                    backgroundColor: LINE_NOT_COLORED_BACKGROUND_COLOR,
                }}
            />
            <EventsLayout ref={eventsLayoutRef}>
                <StyledHeading />
                {events
                    .sort((x, y) => y.timestampMilli - x.timestampMilli)
                    .map(({ timestampMilli, type, heading, snippet }) =>
                        <Event
                            key={timestampMilli}
                            timestampMilli={timestampMilli}
                            type={type}
                            heading={heading}
                            snippet={snippet}
                            lineNotColoredBackgroundColor={
                                LINE_NOT_COLORED_BACKGROUND_COLOR
                            }
                            linePositionLeft={LINE_POSITION_LEFT}
                            lineWidthPx={LINE_WIDTH_PX}
                            timelineMouseClientY={mouseClientY}
                        />
                    )
                }
            </ EventsLayout>
        </StyledContainer>
    );
};
