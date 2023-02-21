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
            source: {
                href: 'https://www.google.com',
            },
            selectors: [],
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
        },
        {
            source: {
                href: 'https://www.google.com',
            },
            selectors: [],
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et nisl fermentum, interdum ex nec, dignissim ipsum. Suspendisse potenti. Vivamus tempus tincidunt elit nec efficitur. Ut accumsan sem vel ex pellentesque, id faucibus augue dignissim. Nulla facilisi. Cras dapibus orci sed pulvinar sollicitudin.',
        },
        {
            source: {
                href: 'https://www.google.com',
            },
            selectors: [],
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
        },
        {
            source: {
                href: 'https://www.google.com',
            },
            selectors: [],
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
        },
        {
            source: {
                href: 'https://www.google.com',
            },
            selectors: [],
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
        },
        {
            source: {
                href: '',
            },
            selectors: [],
            heading: '',
            snippet: '',
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
