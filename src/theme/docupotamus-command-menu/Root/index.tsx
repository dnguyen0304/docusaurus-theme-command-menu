import * as React from 'react';
import './styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function Root({ children }: Props): JSX.Element {
    return (
        <React.StrictMode>
            {children}
        </React.StrictMode>
    );
};
