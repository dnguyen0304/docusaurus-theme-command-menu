import * as React from 'react';
import CommandMenu from '../../components/CommandMenu';
import { AddressBarProvider } from '../../contexts/address-bar';
import { CommandMenuProvider } from '../../contexts/commandMenu';
import { TimelineProvider } from '../../contexts/timeline';
import { WheelProvider } from '../../contexts/wheel';
import CommandMenuKeyboardShortcuts from '../../keyboard-shortcuts/CommandMenu';
import '../../styles.css';

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
