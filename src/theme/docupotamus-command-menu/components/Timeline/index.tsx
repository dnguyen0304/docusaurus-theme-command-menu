import { TimelineEventData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import useDomRect from '../../hooks/useDomRect';
import Event from './Event';
import Line from './Line';

const LINE_WIDTH_PX: number = 4;
const LINE_POSITION_LEFT: React.CSSProperties['left'] = 'var(--space-l)';

const StyledContainer = styled(Box)({
    // TODO(dnguyen0304): Investigate why this or z-index: 0 is needed for the
    //   timeline to be visible.
    position: 'relative',

    backgroundColor: 'var(--docupotamus-color-grey-100)',
    margin: 'var(--space-s)',
    marginLeft: 0,
    overflowY: 'auto',
});

const EventsLayout = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',

    // Use margin on the children instead of padding on the parent because we
    // programmatically get the size.
    '& > *:first-child': {
        marginTop: 'var(--space-m)',
    },
    '& > * + *': {
        marginTop: 'var(--space-s)',
    },
    '& > *:last-child': {
        marginBottom: 'var(--space-m)',
    },
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Timeline({ sx }: Props): JSX.Element {
    const [lineHeight, setLineHeight] = React.useState<number>(0);

    const eventsLayoutRef = React.useRef<HTMLDivElement>();
    const domRect = useDomRect<HTMLDivElement>(eventsLayoutRef);

    // Assume events are sorted by timestampMilli in ascending order.
    const events: TimelineEventData[] = [
        {
            timestampMilli: 1049231539000,
            type: 'Read Recently',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            timestampMilli: 1114786958000,
            type: 'Read Recently',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
        },
        {
            timestampMilli: 1190397622000,
            type: 'Read Recently',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            timestampMilli: 1192149658000,
            type: 'Read Recently',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            timestampMilli: 1257131006000,
            type: 'Read Recently',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
        },
        {
            timestampMilli: 1367703939000,
            type: 'Read Recently',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            timestampMilli: 1400229158000,
            type: 'Read Recently',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
        },
        {
            timestampMilli: 1530712788000,
            type: 'Read Recently',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            timestampMilli: 1613816700000,
            type: 'Read Recently',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            timestampMilli: 1674576222000,
            type: 'Read Recently',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
        },
    ];

    // TODO(dnguyen0304): Investigate if this can be done in CSS.
    React.useEffect(() => {
        if (domRect === undefined) {
            return;
        }
        setLineHeight(domRect.height);
    }, [domRect]);

    return (
        <StyledContainer sx={{ ...sx }}>
            <Line sx={{
                width: `${LINE_WIDTH_PX}px`,
                height: lineHeight,
                left: LINE_POSITION_LEFT,
            }} />
            <EventsLayout ref={eventsLayoutRef}>
                {events
                    .sort((x, y) => y.timestampMilli - x.timestampMilli)
                    .map(({ timestampMilli, type, heading, snippet }) =>
                        <Event
                            key={timestampMilli}
                            timestampMilli={timestampMilli}
                            type={type}
                            heading={heading}
                            snippet={snippet}
                            linePositionLeft={LINE_POSITION_LEFT}
                            lineWidthPx={LINE_WIDTH_PX}
                        />
                    )
                }
            </ EventsLayout>
        </StyledContainer>
    );
};
