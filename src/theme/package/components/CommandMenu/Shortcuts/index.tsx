import { SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { useShortcuts } from '../../../contexts/shortcuts';
import GridLayout, { className as gridClassName } from './GridLayout';
import Shortcut from './Shortcut';
import WheelLayout, { className as wheelClassName } from './WheelLayout';

type LayoutType = 'grid' | 'wheel';

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Shortcuts({ sx }: Props): JSX.Element {
    const { shortcuts } = useShortcuts();

    // TODO(dnguyen0304): Add real implementation.
    const layoutType: LayoutType = 'grid';

    const [Layout, className] =
        (layoutType === 'grid')
            ? [GridLayout, gridClassName]
            : [WheelLayout, wheelClassName];

    return (
        <Layout sx={sx}>
            {shortcuts.map((shortcut, index) => (
                <Shortcut
                    key={`shortcut-${index}`}
                    className={className}
                    index={index}
                    heading={shortcut.heading}
                    snippet={shortcut.snippet}
                    href={shortcut.href}
                />
            ))}
        </Layout>
    );
};
