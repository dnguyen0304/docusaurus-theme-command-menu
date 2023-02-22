import { ReactContextError } from '@docupotamus/docusaurus-lib-common/contexts';
import type { ShortcutData } from '@docusaurus/theme-command-menu';
import * as React from 'react';

const shortcutCount: number = 6;

type Action =
    | {
        type: 'setShortcut';
        index: number;
        newValue: ShortcutData;
    }
    | {
        type: 'setShortcutHeading';
        index: number;
        newValue: ShortcutData['heading'];
    }
    | {
        type: 'clearShortcut';
        index: number;
    };

const reducer = (prev: ShortcutData[], action: Action): ShortcutData[] => {
    const newShortcuts = [...prev];
    const oldShortcut = newShortcuts[action.index];
    if (!oldShortcut) {
        throw new Error('index out of bounds');
    }
    if (action.type === 'setShortcut') {
        newShortcuts[action.index] = action.newValue;
    }
    if (action.type === 'setShortcutHeading') {
        const newShortcut = {
            ...oldShortcut,
            heading: action.newValue,
        };
        newShortcuts[action.index] = newShortcut;
    }
    if (action.type === 'clearShortcut') {
        const newShortcut = {
            source: {
                href: '',
                hrefUserFriendly: '',
            },
            selectors: [],
            heading: '',
            snippet: '',
        };
        newShortcuts[action.index] = newShortcut;
    }
    return newShortcuts;
};

interface ContextValue {
    readonly shortcuts: ShortcutData[];
    readonly dispatchShortcuts: React.Dispatch<Action>;
    readonly intersectedShortcutIndexes: number[];
    readonly setIntersectedShortcutIndexes: React.Dispatch<React.SetStateAction<
        number[]
    >>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    // TODO(dnguyen0304): Investigate changing to use vmax or vmin so width and
    //   height are relative to the same unit.
    const [shortcuts, dispatchShortcuts] = React.useReducer(
        reducer,
        Array(shortcutCount).fill({
            source: {
                href: '',
                hrefUserFriendly: '',
            },
            selectors: [],
            heading: '',
            snippet: '',
        }),
    );
    const [intersectedShortcutIndexes, setIntersectedShortcutIndexes] =
        React.useState<number[]>([]);

    return React.useMemo(
        () => ({
            shortcuts,
            dispatchShortcuts,
            intersectedShortcutIndexes,
            setIntersectedShortcutIndexes,
        }),
        [
            shortcuts,
            dispatchShortcuts,
            intersectedShortcutIndexes,
            setIntersectedShortcutIndexes,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const ShortcutsProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useShortcuts = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('ShortcutsProvider');
    }
    return context;
};
