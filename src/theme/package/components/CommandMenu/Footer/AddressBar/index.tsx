import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useAddressBar } from '../../../../contexts/address-bar';

const StyledBox = styled(Box)({
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',

    background: `linear-gradient(
        to bottom,
        hsla(var(--cm-color-background-hsl), 0.1),
        var(--cm-color-background)
    )`,
});

export default function AddressBar(): JSX.Element {
    const { href } = useAddressBar();

    return (
        <StyledBox>
            <span
                style={{
                    fontFamily: 'var(--cm-font-family-monospace)',
                    marginBottom: 0,
                    paddingLeft: 'var(--d9s-space-xs)',
                }}
            >
                <span style={{ color: 'var(--cm-color-base-darker)' }}>goto:</span> {href}
            </span>
        </StyledBox>
    );
};
