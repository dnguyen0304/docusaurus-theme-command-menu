import CloseIcon from '@mui/icons-material/Close';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useShortcuts } from '../../../../../contexts/shortcuts';

interface StyledBox {
    readonly shortcutBorderWidth: React.CSSProperties['borderWidth'];
};

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'shortcutBorderWidth',
})<StyledBox>(({ shortcutBorderWidth }) => ({
    display: 'flex',
    flexDirection: 'column',

    position: 'absolute',
    top: '50%',
    right: '0',

    backgroundColor: 'var(--cm-color-background-lightest)',
    borderRadius: '41px',
    opacity: 0,
    transform: `translate(calc(50% + ${shortcutBorderWidth}), -50%)`,
    '& .MuiIconButton-root': {
        borderRadius: 0,
        padding: '12px',
        '&:hover': {
            color: 'var(--cm-color-base)',
        },
    },
    '& a.MuiIconButton-root:first-of-type': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingTop: '24px',
    },
    '& button.MuiIconButton-root:last-of-type': {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingBottom: '24px',
    },
}));

interface Props {
    readonly copyText: string;
    readonly href: string;
    readonly shortcutIndex: number;
    readonly shortcutBorderWidth: React.CSSProperties['borderWidth'];
};

export default function ButtonGroup(
    {
        copyText,
        href,
        shortcutIndex,
        shortcutBorderWidth,
    }: Props
): JSX.Element {
    const { dispatchShortcuts } = useShortcuts();

    return (
        <StyledBox shortcutBorderWidth={shortcutBorderWidth}>
            <Tooltip
                placement='right'
                title='Copy'
            >
                <IconButton
                    aria-label='open in a new tab'
                    href={href}
                    target='_blank'
                >
                    <OpenInNewOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip
                placement='right'
                title='Open in New Tab'
            >
                <IconButton
                    aria-label='copy'
                    onClick={() => navigator.clipboard.writeText(copyText)}
                >
                    <ContentCopyOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip
                placement='right'
                title='Clear'
            >
                <IconButton
                    aria-label='clear'
                    onClick={() => dispatchShortcuts({
                        type: 'clearShortcut',
                        index: shortcutIndex,
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </StyledBox>
    );
};
