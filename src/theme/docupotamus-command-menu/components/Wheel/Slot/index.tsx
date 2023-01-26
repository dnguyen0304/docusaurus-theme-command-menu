import { SlotData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useWheel } from '../../../contexts/wheel';
import stylesCommandMenu from '../../styles.module.css';
import ButtonGroup from './ButtonGroup';
import styles from './styles.module.css';

const BORDER_WIDTH: React.CSSProperties['borderWidth'] = '8px';
const TRANSITION_DURATION: React.CSSProperties['transitionDuration'] = '0.3s';

const GlassStyles: React.CSSProperties = {
    backgroundColor: 'rgba(var(--docupotamus-color-grey-100-rgb), 0.6)',
    backdropFilter: 'blur(6px) saturate(100%) brightness(140%)',
    WebkitBackdropFilter: 'blur(6px) saturate(100%) brightness(140%)',
    border: `${BORDER_WIDTH} solid rgba(var(--docupotamus-color-grey-800-rgb), 0.9)`,
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

    borderRadius: 'var(--docupotamus-border-radius-m)',
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
    '&:hover > .MuiBox-root': {
        opacity: 1,
    },
});

const StyledInput = styled(InputBase)({
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'var(--docupotamus-font-size)',
    fontWeight: 'var(--docupotamus-heading-font-weight)',
});

interface Props extends SlotData {
    readonly index: number;
};

// TODO(dnguyen0304): Fix missing responsive design.
export default function Slot(
    {
        index,
        heading,
        snippet,
        sx,
        href,
    }: Props,
): JSX.Element {
    const { dispatchSlots } = useWheel();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSlots({
            type: 'setSlotHeading',
            index,
            newValue: event.target.value,
        });
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
                    value={heading}
                    multiline
                />
            </h2>
            <p className={
                `${styles.text__multilineTruncate} ` +
                `${stylesCommandMenu.text} ` +
                `${stylesCommandMenu.textBody}`
            }>
                {snippet}
            </p>
            <ButtonGroup
                copyText={snippet}
                href={href}
                slotIndex={index}
                slotBorderWidth={BORDER_WIDTH}
            />
        </StyledCard>
    );
};
