import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

const StyledFooter = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--space-2xs)',

    color: 'rgba(var(--docupotamus-color-grey-800-rgb), 0.1)',
    marginTop: 'auto',
    '& .MuiIconButton-root': {
        padding: 0,
    },
});

interface Props {
    readonly copyText: string;
    readonly href: string;
};

export default function ButtonGroup(
    {
        copyText,
        href,
    }: Props
): JSX.Element {
    return (
        <StyledFooter component='footer'>
            <Tooltip
                placement='bottom'
                title='Copy'
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
                placement='bottom'
                title='Open in New Tab'
                arrow
            >
                <IconButton
                    aria-label='open in a new tab'
                    href={href}
                    target='_blank'
                >
                    <OpenInNewOutlinedIcon />
                </IconButton>
            </Tooltip>
        </StyledFooter>
    );
};
