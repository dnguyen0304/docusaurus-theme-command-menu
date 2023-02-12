import type { WrapperProps } from '@docusaurus/types';
import Content from '@theme-init/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import * as React from 'react';
import Decorator from '../../../../decorators/DocSidebar/Desktop/Content';

type Props = Readonly<WrapperProps<typeof ContentType>>;

export default function ContentWrapper(props: Props): JSX.Element {
    return (
        <Decorator>
            <Content {...props} />
        </Decorator>
    );
};
