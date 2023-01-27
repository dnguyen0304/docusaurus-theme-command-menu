import type {
    KeyHandlers as KeyHandlersType,
    KeyMap as KeyMapType
} from '@docusaurus/theme-command-menu';
import * as React from 'react';
import { HotKeys } from 'react-hotkeys';
import { useCommandMenu } from '../contexts/commandMenu';

const keyMap: KeyMapType = {
    COMMAND_MENU_OPEN: 'shift shift',
};

interface Props {
    readonly children: React.ReactNode;
};

export const KeyMap = ({ children }: Props): JSX.Element => {
    return (
        <HotKeys keyMap={keyMap}>
            {children}
        </HotKeys>
    );
};

export const KeyHandlers = ({ children }: Props): JSX.Element => {
    const { setIsOpen } = useCommandMenu();

    const handlers: KeyHandlersType = {
        COMMAND_MENU_OPEN: () => setIsOpen(true),
    };

    return (
        <HotKeys handlers={handlers}>
            {children}
        </HotKeys>
    );
};
