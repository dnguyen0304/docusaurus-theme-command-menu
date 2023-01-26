import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TILE_BORDER_WIDTH_PX } from '../../../constants';

const StyledBox = styled(Box)({
    // Include a buffer by doubling the needed border-width. For example, we
    // only need to subtract the left and right border-width (2X), but then we
    // double that again (4X).
    width: `calc(100% - ${4 * TILE_BORDER_WIDTH_PX}px)`,
    height: `calc(100% - ${2 * TILE_BORDER_WIDTH_PX}px)`,

    backgroundColor: 'var(--docupotamus-color-grey-100)',
});

interface Props { };

export default function AddressBar({ }: Props): JSX.Element {
    return (
        <StyledBox />
    );
};
