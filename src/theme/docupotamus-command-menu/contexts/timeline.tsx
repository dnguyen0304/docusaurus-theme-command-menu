import { TimelineEventData } from '@docusaurus/theme-command-menu';
import * as React from 'react';
import { ReactContextError } from './errors';

interface ContextValue {
    readonly events: TimelineEventData[];
    readonly setEvents: React.Dispatch<React.SetStateAction<
        TimelineEventData[]
    >>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [events, setEvents] = React.useState<TimelineEventData[]>([]);

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
