import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledButton = styled(Button)({
    textTransform: 'lowercase',
});

interface Props {
    readonly label: string;
};

export default function Tag(
    {
        label,
    }: Props,
): JSX.Element {
    return (
        <StyledButton variant='outlined'>
            {label}
        </StyledButton>
    );
};
