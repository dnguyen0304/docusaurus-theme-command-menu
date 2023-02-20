import * as React from 'react';
import { SelectionObserver } from '../services/annotate/selection-observer'; /* TODO(dnguyen0304): Fix missing type declaration. */
import { ReactContextError } from './errors';

interface ContextValue {
    readonly range: Range | null;
    readonly setRange: React.Dispatch<React.SetStateAction<Range | null>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [range, setRange] = React.useState<Range | null>(null);

    const rangeObserverRef = React.useRef<SelectionObserver>(null);

    React.useEffect(() => {
        rangeObserverRef.current = new SelectionObserver(
            (range: Range | null) => setRange(range)
        );
    }, []);

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

export const SelectionProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useSelection = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('SelectionProvider');
    }
    return context;
};
