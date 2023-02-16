import { SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { useShortcuts } from '../../../contexts/shortcuts';
import Layout, { className } from './GridLayout';
import Shortcut from './Shortcut';

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Shortcuts({ sx }: Props): JSX.Element {
    const { shortcuts } = useShortcuts();

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
