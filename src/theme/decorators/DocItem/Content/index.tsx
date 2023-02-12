import * as React from 'react';
import Annotater from '../../../package/components/Annotater';

interface Props {
    readonly children: React.ReactNode;
};

export default function ContentDecorator({ children }: Props): JSX.Element {
    return (
        <>
            {children}
            <Annotater />
        </>
    );
};
