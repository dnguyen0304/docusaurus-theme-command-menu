import { SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { useShortcuts } from '../../../contexts/shortcuts';
import Shortcut from './Shortcut';
import WheelLayout, { className as wheelClassName } from './WheelLayout';

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Shortcuts({ sx }: Props): JSX.Element {
    const { shortcuts } = useShortcuts();

    return (
        <WheelLayout sx={sx}>
            {shortcuts.map((shortcut, index) => (
                <Shortcut
                    key={`shortcut-${index}`}
                    className={wheelClassName}
                    index={index}
                    heading={shortcut.heading}
                    snippet={shortcut.snippet}
                    href={shortcut.href}
                />
            ))}
        </WheelLayout>
    );
};
