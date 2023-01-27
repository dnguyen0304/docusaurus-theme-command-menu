import * as React from 'react';
import CommandMenu from '../components/CommandMenu';
import { AddressBarProvider } from '../contexts/addressBar';
import { AnnotaterProvider } from '../contexts/annotater';
import { CommandMenuProvider } from '../contexts/commandMenu';
import { TimelineProvider } from '../contexts/timeline';
import { WheelProvider } from '../contexts/wheel';
import './styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function Root({ children }: Props): JSX.Element {
    return (
        <React.StrictMode>
            <CommandMenuProvider>
                <AnnotaterProvider>
                    <AddressBarProvider>
                        <WheelProvider>
                            <TimelineProvider>
                                <CommandMenu />
                                {children}
                            </TimelineProvider>
                        </WheelProvider>
                    </AddressBarProvider>
                </AnnotaterProvider>
            </CommandMenuProvider>
        </React.StrictMode>
    );
};
