import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledBox = styled(Box)({});

interface Props {
    readonly label: string;
};

export default function Tag(
    {
        label,
    }: Props,
): JSX.Element {
    return (
        <StyledBox>
            {label}
        </StyledBox>
    );
};
