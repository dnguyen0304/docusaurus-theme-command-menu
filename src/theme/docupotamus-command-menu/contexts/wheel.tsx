import { SlotData } from '@docusaurus/theme-command-menu';
import * as React from 'react';
import { ReactContextError } from './errors';

type Action =
    | {
        type: 'setSlotHeading';
        index: number;
        newValue: SlotData['heading'];
    }
    | {
        type: 'clearSlot';
        index: number;
    };

const reducer = (prev: SlotData[], action: Action): SlotData[] => {
    if (action.type === 'setSlotHeading') {
        const newSlots = [...prev];
        const oldSlot = newSlots[action.index];
        if (!oldSlot) {
            throw new Error('index out of bounds');
        }
        const newSlot = {
            ...oldSlot,
            heading: action.newValue,
        };
        newSlots[action.index] = newSlot;
        return newSlots;
    }
    if (action.type === 'clearSlot') {
        const newSlots = [...prev];
        const oldSlot = newSlots[action.index];
        if (!oldSlot) {
            throw new Error('index out of bounds');
        }
        const newSlot = {
            ...oldSlot,
            heading: '',
            snippet: '',
            href: '',
        };
        newSlots[action.index] = newSlot;
        return newSlots;
    }
    return prev;
};

interface ContextValue {
    readonly slots: SlotData[];
    readonly dispatchSlots: React.Dispatch<Action>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    // TODO(dnguyen0304): Remove fake data.
    // TODO(dnguyen0304): Investigate changing to use vmax or vmin so width and
    //   height are relative to the same unit.
    const [slots, dispatchSlots] = React.useReducer(reducer, [
        {
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
            sx: { translate: '0 -80%' },
            href: 'https://www.google.com',
        },
        {
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et nisl fermentum, interdum ex nec, dignissim ipsum. Suspendisse potenti. Vivamus tempus tincidunt elit nec efficitur. Ut accumsan sem vel ex pellentesque, id faucibus augue dignissim. Nulla facilisi. Cras dapibus orci sed pulvinar sollicitudin.',
            sx: { translate: '130% -30%' },
            href: 'https://www.google.com',
        },
        {
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
            sx: { translate: '70% 90%' },
            href: 'https://www.google.com',
        },
        {
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
            sx: { translate: '-70% 90%' },
            href: 'https://www.google.com',
        },
        {
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
            sx: { translate: '-130% -30%' },
            href: 'https://www.google.com',
        },
    ]);

    return React.useMemo(
        () => ({
            slots,
            dispatchSlots,
        }),
        [
            slots,
            dispatchSlots,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const WheelProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useWheel = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('WheelProvider');
    }
    return context;
};
