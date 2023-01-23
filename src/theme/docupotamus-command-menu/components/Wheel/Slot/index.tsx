import { SlotData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import ButtonGroup from './ButtonGroup';
import styles from './styles.module.css';

const TRANSITION_DURATION: React.CSSProperties['transitionDuration'] = '1s';

const GlassStyles: React.CSSProperties = {
    backgroundColor: 'rgba(17, 25, 40, 0.6)',
    backdropFilter: 'blur(6px) saturate(100%) brightness(140%)',
    WebkitBackdropFilter: 'blur(6px) saturate(100%) brightness(140%)',
    border: '6px solid rgba(255, 255, 255, 0.9)',
    boxShadow: `
        0px 0px 12px 0px rgba(136, 165, 191, 0.48),
        0px 0px 12px 0px rgba(255, 255, 255, 0.8)
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
            0px 0px 24px 0px rgba(255, 255, 255, 0.9)
        `,
        transition: `all ${TRANSITION_DURATION} ease-in-out`,
        transitionProperty: 'backdrop-filter, box-shadow',
    },
    '&:hover .MuiSvgIcon-root': {
        color: 'rgba(255, 255, 255, 0.3)',
    },
    '& .MuiSvgIcon-root:hover': {
        color: 'rgba(255, 255, 255, 1.0)',
    },
});

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        padding: 0,
    },
});

interface Props extends SlotData {
    readonly index: number;
};

export default function Slot(
    {
        index,
        description,
        heading,
        snippet,
        sx,
    }: Props,
): JSX.Element {
    const [value, setValue] =
        React.useState<string>(description || `Slot ${index}`);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <StyledCard
            className={styles.Slot_card}
            component='section'
            sx={{ ...sx }}
        >
            <h2 className={styles.Slot_description}>
                <StyledTextField
                    autoComplete='off'
                    onChange={handleChange}
                    value={value}
                    variant='outlined'
                />
            </h2>
            <p style={{ margin: 'auto 0' }}>
                <span className={styles.Slot_heading}>{heading}: </span>
                <span className={styles.Slot_snippet}>{snippet}</span>
            </p>
            <ButtonGroup />
        </StyledCard>
    );
};
