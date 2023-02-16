import type { ShortcutData } from '@docusaurus/theme-command-menu';
import * as React from 'react';
import { ReactContextError } from './errors';

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
            ...oldShortcut,
            heading: '',
            snippet: '',
            href: '',
        };
        newShortcuts[action.index] = newShortcut;
    }
    return newShortcuts;
};

interface ContextValue {
    readonly shortcuts: ShortcutData[];
    readonly dispatchShortcuts: React.Dispatch<Action>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    // TODO(dnguyen0304): Remove fake data.
    // TODO(dnguyen0304): Investigate changing to use vmax or vmin so width and
    //   height are relative to the same unit.
    const [shortcuts, dispatchShortcuts] = React.useReducer(reducer, [
        {
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
            href: 'https://www.google.com',
        },
        {
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et nisl fermentum, interdum ex nec, dignissim ipsum. Suspendisse potenti. Vivamus tempus tincidunt elit nec efficitur. Ut accumsan sem vel ex pellentesque, id faucibus augue dignissim. Nulla facilisi. Cras dapibus orci sed pulvinar sollicitudin.',
            href: 'https://www.google.com',
        },
        {
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
            href: 'https://www.google.com',
        },
        {
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
            href: 'https://www.google.com',
        },
        {
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
            href: 'https://www.google.com',
        },
    ]);

    return React.useMemo(
        () => ({
            shortcuts,
            dispatchShortcuts,
        }),
        [
            shortcuts,
            dispatchShortcuts,
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
