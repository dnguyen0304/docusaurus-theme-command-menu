import type { WrapperProps } from '@docusaurus/types';
import RootInit from '@theme-init/Root';
import type RootType from '@theme/Root';
import * as React from 'react';
import useCommandMenuThemeConfig from '../docupotamus-command-menu/hooks/useCommandMenuThemeConfig';
import RootSwizzle from '../docupotamus-command-menu/theme/Root';

type Props = Readonly<WrapperProps<typeof RootType>>;

export default function RootWrapper(props: Props): JSX.Element {
    const { swizzleIsEnabled } = useCommandMenuThemeConfig();

    return (
        (swizzleIsEnabled)
            ? <RootSwizzle {...props} />
            : <RootInit {...props} />
    );
};
