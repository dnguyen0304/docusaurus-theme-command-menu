import * as React from 'react';
import CommandMenu from '../../docupotamus-command-menu/components/CommandMenu';
import { AddressBarProvider } from '../../docupotamus-command-menu/contexts/address-bar';
import { CommandMenuProvider } from '../../docupotamus-command-menu/contexts/command-menu';
import { TimelineProvider } from '../../docupotamus-command-menu/contexts/timeline';
import { WheelProvider } from '../../docupotamus-command-menu/contexts/wheel';
import CommandMenuKeyboardShortcuts from '../../docupotamus-command-menu/keyboard-shortcuts/CommandMenu';
import '../../docupotamus-command-menu/styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function Root({ children }: Props): JSX.Element {
    return (
        <React.StrictMode>
            <CommandMenuProvider>
                <CommandMenuKeyboardShortcuts>
                    <AddressBarProvider>
                        <WheelProvider>
                            <TimelineProvider>
                                <CommandMenu />
                                {children}
                            </TimelineProvider>
                        </WheelProvider>
                    </AddressBarProvider>
                </CommandMenuKeyboardShortcuts>
            </CommandMenuProvider>
        </React.StrictMode>
    );
};
