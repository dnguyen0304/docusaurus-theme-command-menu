import * as React from 'react';
import CommandMenu from '../components/CommandMenu';
import { TimelineProvider } from '../contexts/timeline';
import './styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function Root({ children }: Props): JSX.Element {
    return (
        <React.StrictMode>
            <TimelineProvider>
                <CommandMenu />
                {children}
            </TimelineProvider>
        </React.StrictMode>
    );
};
