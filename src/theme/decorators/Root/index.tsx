import * as React from 'react';
import CommandMenu from '../../package/components/CommandMenu';
import { AddressBarProvider } from '../../package/contexts/address-bar';
import { CommandMenuProvider } from '../../package/contexts/command-menu';
import { ShortcutsProvider } from '../../package/contexts/shortcuts';
import { TimelineProvider } from '../../package/contexts/timeline';
import CommandMenuKeyboardShortcuts from '../../package/keyboard-shortcuts/CommandMenu';
import '../../package/styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function RootDecorator({ children }: Props): JSX.Element {
    return (
        <React.StrictMode>
            <CommandMenuProvider>
                <CommandMenuKeyboardShortcuts>
                    <AddressBarProvider>
                        <ShortcutsProvider>
                            <TimelineProvider>
                                {children}
                                <CommandMenu />
                            </TimelineProvider>
                        </ShortcutsProvider>
                    </AddressBarProvider>
                </CommandMenuKeyboardShortcuts>
            </CommandMenuProvider>
        </React.StrictMode>
    );
};
