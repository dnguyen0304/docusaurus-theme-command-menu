import * as React from 'react';
import Annotater from '../../../package/components/Annotater';
import { SelectionProvider } from '../../../package/contexts/selection';

interface Props {
    readonly children: React.ReactNode;
};

export default function ContentDecorator({ children }: Props): JSX.Element {
    return (
        <SelectionProvider>
            {children}
            <Annotater />
        </SelectionProvider>
    );
};
