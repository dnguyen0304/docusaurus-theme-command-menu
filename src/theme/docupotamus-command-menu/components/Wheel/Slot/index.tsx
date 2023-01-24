import { SlotData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import ButtonGroup from './ButtonGroup';
import styles from './styles.module.css';

const TRANSITION_DURATION: React.CSSProperties['transitionDuration'] = '0.3s';

const GlassStyles: React.CSSProperties = {
    backgroundColor: 'rgba(var(--docupotamus-color-grey-100-rgb), 0.6)',
    backdropFilter: 'blur(6px) saturate(100%) brightness(140%)',
    WebkitBackdropFilter: 'blur(6px) saturate(100%) brightness(140%)',
    border: '8px solid rgba(var(--docupotamus-color-grey-800-rgb), 0.9)',
    boxShadow: `
        0px 0px 12px 0px rgba(136, 165, 191, 0.48),
        0px 0px 12px 0px rgba(var(--docupotamus-color-grey-800-rgb), 0.8)
    `,
};

const StyledCard = styled(Box)({
    ...GlassStyles,
    position: 'absolute',
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    borderRadius: 'var(--space-m)',
    padding: 'var(--space-m)',
    // TODO(dnguyen0304): Investigate improving performance.
    '&:hover': {
        backdropFilter: 'blur(6px) saturate(100%) brightness(200%)',
        boxShadow: `
            0px 0px 24px 0px rgba(136, 165, 191, 0.7),
            0px 0px 24px 0px rgba(var(--docupotamus-color-grey-800-rgb), 0.9)
        `,
        transition: `all ${TRANSITION_DURATION} ease-in-out`,
        transitionProperty: 'backdrop-filter, box-shadow',
    },
    '&:hover .MuiSvgIcon-root': {
        color: 'rgba(var(--docupotamus-color-grey-800-rgb), 0.3)',
    },
    '& .MuiSvgIcon-root:hover': {
        color: 'rgba(var(--docupotamus-color-grey-800-rgb), 1.0)',
    },
});

const StyledInput = styled(InputBase)({
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size--1)',
    fontWeight: '600',
});

interface Props extends SlotData { };

export default function Slot(
    {
        heading,
        snippet,
        sx,
    }: Props,
): JSX.Element {
    const [value, setValue] = React.useState<string>(heading);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <StyledCard
            className={styles.Slot_card}
            component='section'
            sx={{ ...sx }}
        >
            <h2 className={styles.Slot_descriptionContainer}>
                <StyledInput
                    autoComplete='off'
                    maxRows={Infinity}
                    onChange={handleChange}
                    value={value}
                    multiline
                />
            </h2>
            <p className={styles.Slot_snippet} >
                {snippet}
            </p>
            <ButtonGroup />
        </StyledCard>
    );
};
