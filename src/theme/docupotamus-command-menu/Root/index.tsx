import * as React from 'react';
import CommandMenu from '../components/CommandMenu';
import './styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function Root({ children }: Props): JSX.Element {
    return (
        <React.StrictMode>
            <CommandMenu />
            {children}
        </React.StrictMode>
    );
};
