import * as React from 'react';
import Entry from '../../../../package/components/Entry';

interface Props {
    readonly children: React.ReactNode;
};

export default function ContentDecorator({ children }: Props): JSX.Element {
    return (
        <>
            {children}
            <Entry />
        </>
    );
};
