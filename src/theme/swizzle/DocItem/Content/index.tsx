import type { WrapperProps } from '@docusaurus/types';
import Content from '@theme-init/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import * as React from 'react';
import Annotater from '../../../docupotamus-command-menu/components/Annotater';

type Props = Readonly<WrapperProps<typeof ContentType>>;

export default function ContentWrapper(props: Props): JSX.Element {
    return (
        <>
            <Content {...props} />
            <Annotater />
        </>
    );
};
