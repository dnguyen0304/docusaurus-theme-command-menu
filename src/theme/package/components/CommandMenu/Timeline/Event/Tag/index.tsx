import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledChip = styled(Chip)({
    backgroundColor: 'var(--ifm-color-gray-500)',
    borderRadius: 'var(--docupotamus-border-radius-s)',
    color: 'var(--ifm-color-white)',
    fontFamily: 'var(--ifm-font-family-base)',
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
