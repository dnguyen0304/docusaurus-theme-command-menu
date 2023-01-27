import * as React from 'react';
import { ReactContextError } from './errors';

interface ContextValue {
    readonly range: Range | null;
    readonly setRange: React.Dispatch<React.SetStateAction<Range | null>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [range, setRange] = React.useState<Range | null>(null);

    return React.useMemo(
        () => ({
            range,
            setRange,
        }),
        [
            range,
            setRange,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const AnnotaterProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useAnnotater = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('AnnotaterProvider');
    }
    return context;
};
