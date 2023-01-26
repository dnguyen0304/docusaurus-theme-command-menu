import CloseIcon from '@mui/icons-material/Close';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import styles from './styles.module.css';

interface StyledBox {
    readonly slotBorderWidth: React.CSSProperties['borderWidth'];
};

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'slotBorderWidth',
})<StyledBox>(({ slotBorderWidth }) => ({
    display: 'flex',
    flexDirection: 'column',

    position: 'absolute',
    top: '50%',
    right: '0',

    backgroundColor: 'var(--docupotamus-color-grey-700)',
    borderRadius: '41px',
    opacity: 0,
    transform: `translate(calc(50% + ${slotBorderWidth}), -50%)`,
    transition: 'opacity 0.25s ease-in-out',
    '& .MuiIconButton-root': {
        borderRadius: 0,
        padding: '12px',
        '&:hover': {
            color: 'var(--docupotamus-color-grey-800)',
        },
    },
    [`& .MuiIconButton-root.${styles.Button__first}`]: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingTop: '24px',
    },
    [`& .MuiIconButton-root.${styles.Button__last}`]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingBottom: '24px',
    },
}));

interface Props {
    readonly copyText: string;
    readonly href: string;
    readonly slotBorderWidth: React.CSSProperties['borderWidth'];
};

export default function ButtonGroup(
    {
        copyText,
        href,
        slotBorderWidth,
    }: Props
): JSX.Element {
    return (
        <StyledBox slotBorderWidth={slotBorderWidth}>
            <Tooltip
                placement='right'
                title='Copy'
                arrow
            >
                <IconButton
                    aria-label='open in a new tab'
                    className={styles.Button__first}
                    href={href}
                    target='_blank'
                >
                    <OpenInNewOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip
                placement='right'
                title='Open in New Tab'
                arrow
            >
                <IconButton
                    aria-label='copy'
                    onClick={() => { navigator.clipboard.writeText(copyText) }}
                >
                    <ContentCopyOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip
                placement='right'
                title='Clear'
                arrow
            >
                <IconButton
                    aria-label='clear'
                    className={styles.Button__last}
                >
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </StyledBox>
    );
};
