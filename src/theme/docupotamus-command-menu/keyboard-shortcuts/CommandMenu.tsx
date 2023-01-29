import type {
    KeyHandlers as KeyHandlersType,
    KeyMap as KeyMapType
} from '@docusaurus/theme-command-menu';
import * as React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { useCommandMenu } from '../contexts/commandMenu';

const keyMap: KeyMapType = {
    COMMAND_MENU_CLOSE: 'esc',
    COMMAND_MENU_OPEN: 'shift shift',
};

interface Props {
    readonly children: React.ReactNode;
};

export default function CommandMenu({ children }: Props): JSX.Element {
    const { setIsOpen } = useCommandMenu();

    const handlers: KeyHandlersType = {
        COMMAND_MENU_CLOSE: () => setIsOpen(false),
        COMMAND_MENU_OPEN: () => setIsOpen(true),
    };

    return (
        <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
            {children}
        </GlobalHotKeys>
    );
};
