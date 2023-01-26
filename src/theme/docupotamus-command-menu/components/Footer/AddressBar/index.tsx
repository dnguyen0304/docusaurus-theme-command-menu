import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledBox = styled(Box)({
    width: '100%',
});

interface Props { };

export default function AddressBar({ }: Props): JSX.Element {
    return (
        <StyledBox />
    );
};
