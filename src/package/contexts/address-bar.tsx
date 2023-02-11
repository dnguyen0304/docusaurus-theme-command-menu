import * as React from 'react';
import { ReactContextError } from './errors';

interface ContextValue {
    readonly href: string;
    readonly setHref: React.Dispatch<React.SetStateAction<string>>
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [href, setHref] = React.useState<string>('');

    return React.useMemo(
        () => ({
            href,
            setHref,
        }),
        [
            href,
            setHref,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const AddressBarProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useAddressBar = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('AddressBarProvider');
    }
    return context;
};
