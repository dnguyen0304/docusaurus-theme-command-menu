import * as React from 'react';
import { ReactContextError } from './errors';

interface ContextValue {
    readonly isOpen: boolean;
    readonly setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return React.useMemo(
        () => ({
            isOpen,
            setIsOpen,
        }),
        [
            isOpen,
            setIsOpen,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const CommandMenuProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useCommandMenu = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('CommandMenuProvider');
    }
    return context;
};
