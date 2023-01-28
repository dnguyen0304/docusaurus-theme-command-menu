import type { WrapperProps } from '@docusaurus/types';
import ContentInit from '@theme-init/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import * as React from 'react';
import useCommandMenuThemeConfig from '../../../docupotamus-command-menu/hooks/useCommandMenuThemeConfig';
import ContentSwizzle from '../../../docupotamus-command-menu/theme/DocSidebar/Desktop/Content';

type Props = Readonly<WrapperProps<typeof ContentType>>;

export default function ContentWrapper(props: Props): JSX.Element {
    const { swizzleIsEnabled } = useCommandMenuThemeConfig();

    return (
        (swizzleIsEnabled)
            ? <ContentSwizzle {...props} />
            : <ContentInit {...props} />
    );
};
