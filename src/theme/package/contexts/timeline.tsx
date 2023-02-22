import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import { TimelineEventData } from '@docusaurus/theme-command-menu';
import * as React from 'react';

interface ContextValue {
    // Events are sorted by timestampMilli in ascending order.
    readonly events: TimelineEventData[];
    readonly setEvents: React.Dispatch<React.SetStateAction<
        TimelineEventData[]
    >>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    // TODO(dnguyen0304): Remove fake data.
    const [events, setEvents] = React.useState<TimelineEventData[]>([
        {
            timestampMilli: 1596440393000,
            type: 'Read',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: 1602460683000,
            type: 'Read',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: 1609940715000,
            type: 'Read',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: 1639568514000,
            type: 'Read',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: 1649236070000,
            type: 'Read',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: 1654770354000,
            type: 'Read',
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: 1655805254000,
            type: 'Read',
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: 1674663945000,
            type: 'Read',
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: 1674663965000,
            type: 'Read',
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            href: 'https://www.youtube.com',
        },
        {
            timestampMilli: Date.now(),
            type: 'Read',
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
            href: 'https://www.youtube.com',
        },
    ]);

    return React.useMemo(
        () => ({
            events,
            setEvents,
        }),
        [
            events,
            setEvents,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const TimelineProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useTimeline = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('TimelineProvider');
    }
    return context;
};
