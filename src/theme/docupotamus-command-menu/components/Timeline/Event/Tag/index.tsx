import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledChip = styled(Chip)({
    // TODO(dnguyen0304): Extract to a centralized location to facilitate
    //   maintenance.
    backgroundColor: 'rgb(98, 0, 234)',
    borderRadius: 'var(--docupotamus-border-radius-s)',
    color: 'var(--docupotamus-color-grey-800)',
    fontFamily: 'var(--docupotamus-font-family)',
    fontWeight: 400,
    '&&:hover': {
        backgroundColor: 'var(--docupotamus-color-grey-300)',
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
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => { };

    return (
        <StyledChip
            label={label}
            onClick={handleClick}
            variant='filled'
        />
    );
};
