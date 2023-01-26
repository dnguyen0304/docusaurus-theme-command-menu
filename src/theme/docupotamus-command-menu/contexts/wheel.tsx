import { SlotData } from '@docusaurus/theme-command-menu';
import * as React from 'react';
import { ReactContextError } from './errors';

interface ContextValue {
    readonly slots: SlotData[];
    readonly setSlots: React.Dispatch<React.SetStateAction<SlotData[]>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    // TODO(dnguyen0304): Remove fake data.
    // TODO(dnguyen0304): Investigate changing to use vmax or vmin so width and
    //   height are relative to the same unit.
    const [slots, setSlots] = React.useState<SlotData[]>([
        {
            heading: 'Dimensions',
            snippet: 'between 996px and 1440px',
            sx: { translate: '0 -80%' }
        },
        {
            heading: 'Latin',
            snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et nisl fermentum, interdum ex nec, dignissim ipsum. Suspendisse potenti. Vivamus tempus tincidunt elit nec efficitur. Ut accumsan sem vel ex pellentesque, id faucibus augue dignissim. Nulla facilisi. Cras dapibus orci sed pulvinar sollicitudin.',
            sx: { translate: '130% -30%' }
        },
        {
            heading: 'useReduce hook',
            snippet: 'const [state, dispatch] = useReducer(reducer, initialState);',
            sx: { translate: '70% 90%' }
        },
        {
            heading: 'Environment',
            snippet: 'CLIENT_ID, CLIENT_SECRET, REFERER_ALLOWLIST',
            sx: { translate: '-70% 90%' }
        },
        {
            heading: 'Last Position Shortcut',
            snippet: 'shift + ctrl + left',
            sx: { translate: '-130% -30%' }
        },
    ]);

    return React.useMemo(
        () => ({
            slots,
            setSlots,
        }),
        [
            slots,
            setSlots,
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
