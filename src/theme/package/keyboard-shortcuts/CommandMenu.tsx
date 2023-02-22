import type {
    KeyHandlers as KeyHandlersType,
    KeyMap as KeyMapType
} from '@docupotamus/docusaurus-lib-common/types';
import type { KeyBindings } from '@docusaurus/theme-command-menu';
import * as React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { useCommandMenu } from '../contexts/command-menu';

const keyMap: KeyMapType<KeyBindings> = {
    COMMAND_MENU_CLOSE: 'esc',
    COMMAND_MENU_OPEN: 'shift shift',
};

interface Props {
    readonly children: React.ReactNode;
};

export default function CommandMenu({ children }: Props): JSX.Element {
    const { setIsOpen } = useCommandMenu();

    const handlers: KeyHandlersType<KeyBindings> = {
        COMMAND_MENU_CLOSE: () => setIsOpen(false),
        COMMAND_MENU_OPEN: () => setIsOpen(true),
    };

    return (
        <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
            {children}
        </GlobalHotKeys>
    );
};
