import * as React from 'react';
import CommandMenu from '../components/CommandMenu';
import { TimelineProvider } from '../contexts/timeline';
import { WheelProvider } from '../contexts/wheel';
import './styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function Root({ children }: Props): JSX.Element {
    return (
        <React.StrictMode>
            <WheelProvider>
                <TimelineProvider>
                    <CommandMenu />
                    {children}
                </TimelineProvider>
            </WheelProvider>
        </React.StrictMode>
    );
};
