import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TILE_BORDER_WIDTH_PX } from '../../../../constants';
import { useAddressBar } from '../../../../contexts/address-bar';

const StyledBox = styled(Box)({
    // Include a buffer by doubling the needed border-width. For example, we
    // only need to subtract the left and right border-width (2X), but then we
    // double that again (4X).
    width: `calc(100% - ${4 * TILE_BORDER_WIDTH_PX}px)`,
    height: `calc(100% - ${2 * TILE_BORDER_WIDTH_PX}px)`,

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
                <span style={{ color: 'var(--cm-color-base-darker))' }}>goto:</span> {href}
            </span>
        </StyledBox>
    );
};
