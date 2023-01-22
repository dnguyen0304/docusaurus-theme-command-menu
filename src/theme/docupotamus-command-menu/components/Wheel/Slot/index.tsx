import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledBox = styled(Box)({
    width: '100%',
    height: '100%',

    position: 'absolute',
});

interface Props {
    readonly index: number;
};

export default function Slot({ index }: Props): JSX.Element {
    return (
        <StyledBox>
            Slot
        </StyledBox>
    );
};
