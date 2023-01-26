import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { FOOTER_HEIGHT } from '../../constants';
import AddressBar from './AddressBar';

const StyledBox = styled(Box)({
    height: FOOTER_HEIGHT,

    // TODO(dnguyen0304): Investigate why this or z-index: 0 is needed for the
    //   timeline to be visible.
    position: 'relative',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Footer({ sx }: Props): JSX.Element {
    return (
        <StyledBox sx={{ ...sx }}>
            <AddressBar />
        </StyledBox>
    );
};
