import type { WrapperProps } from '@docusaurus/types';
import Content from '@theme-init/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import * as React from 'react';
import Entry from '../../../../package/components/Entry';

type Props = Readonly<WrapperProps<typeof ContentType>>;

export default function ContentWrapper(props: Props): JSX.Element {
    return (
        <>
            <Content {...props} />
            <Entry />
        </>
    );
};
