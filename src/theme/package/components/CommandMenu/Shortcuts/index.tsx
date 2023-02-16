import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { useShortcuts } from '../../../contexts/shortcuts';
import Shortcut from './Shortcut';

const StyledBox = styled(Box)({
    // TODO(dnguyen0304): Fix missing responsive design.
    width: '25%',
    minWidth: '100px',
    aspectRatio: '3 / 2.5',

    position: 'relative',
    placeSelf: 'center',

    color: 'var(--cm-color-base)',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Shortcuts({ sx }: Props): JSX.Element {
    const { shortcuts } = useShortcuts();

    return (
        <StyledBox sx={sx}>
            {shortcuts.map((shortcut, index) => (
                <Shortcut
                    key={`shortcut-${index}`}
                    index={index}
                    heading={shortcut.heading}
                    snippet={shortcut.snippet}
                    href={shortcut.href}
                />
            ))}
        </StyledBox>
    );
};
