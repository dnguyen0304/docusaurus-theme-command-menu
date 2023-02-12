import * as React from 'react';
import CommandMenu from '../../package/components/CommandMenu';
import { AddressBarProvider } from '../../package/contexts/address-bar';
import { CommandMenuProvider } from '../../package/contexts/command-menu';
import { TimelineProvider } from '../../package/contexts/timeline';
import { WheelProvider } from '../../package/contexts/wheel';
import CommandMenuKeyboardShortcuts from '../../package/keyboard-shortcuts/CommandMenu';
import '../../package/styles.css';

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
                                {children}
                                <CommandMenu />
                            </TimelineProvider>
                        </WheelProvider>
                    </AddressBarProvider>
                </CommandMenuKeyboardShortcuts>
            </CommandMenuProvider>
        </React.StrictMode>
    );
};
