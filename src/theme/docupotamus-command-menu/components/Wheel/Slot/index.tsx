import { SlotData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import styles from './styles.module.css';

const StyledCard = styled(Box)({
    position: 'absolute',
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    borderRadius: 'var(--space-m)',
    // TODO(dnguyen0304): Remove development code.
    outline: '2px solid red',
    padding: 'var(--space-m)',

    // backgroundColor: 'rgba(255, 255, 255, 0.01)',
    // backdropFilter: 'blur(40px)',
    // backgroundClip: 'padding-box',
    // border: '2px solid transparent',
    // boxShadow: '10px 10px 10px rgba(46, 54, 68, 0.03)',
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
                <span>{snippet}</span>
            </p>
        </StyledCard>
    );
};
