import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledChip = styled(Chip)({
    backgroundColor: 'var(--cm-color-base-darkest)',
    borderRadius: 'var(--cm-border-radius-rounder)',
    color: 'inherit',
    font: 'inherit',
    fontSize: 'var(--d9s-font-size--1)',
    '&&:hover': {
        backgroundColor: 'var(--ifm-color-gray-400)',
    },
});

interface Props {
    readonly label: string;
};

export default function Tag(
    {
        label,
    }: Props,
): JSX.Element {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (_event) => { };

    return (
        <StyledChip
            label={label}
            onClick={handleClick}
            variant='filled'
        />
    );
};
