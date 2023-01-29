import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TILE_BORDER_WIDTH_PX } from '../../../../constants';
import { useAddressBar } from '../../../../contexts/address-bar';
import stylesCommon from '../../../styles.module.css';

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
        rgba(var(--docupotamus-color-grey-100-rgb), 0.1),
        var(--docupotamus-color-grey-100)
    )`,
});

export default function AddressBar(): JSX.Element {
    const { href } = useAddressBar();

    return (
        <StyledBox>
            <span
                className={stylesCommon.textBody}
                style={{
                    fontFamily: '"Overpass Mono", monospace',
                    marginBottom: 0,
                    paddingLeft: 'var(--space-xs)',
                }}
            >
                <span style={{ color: 'rgba(var(--docupotamus-color-grey-700-rgb), 0.6)' }}>goto:</span> {href}
            </span>
        </StyledBox>
    );
};
