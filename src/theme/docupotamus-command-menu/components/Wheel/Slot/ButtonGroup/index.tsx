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

    color: 'rgba(var(--color-grey-800-rgb), 0.1)',
    marginTop: 'auto',
    '& .MuiIconButton-root': {
        padding: 0,
    },
});

export default function ButtonGroup(): JSX.Element {
    return (
        <StyledFooter component='footer'>
            <Tooltip
                placement='bottom'
                title='Copy'
                arrow
            >
                <IconButton aria-label='copy'>
                    <ContentCopyOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip
                placement='bottom'
                title='Open in New Tab'
                arrow
            >
                <IconButton aria-label='open in a new tab'>
                    <OpenInNewOutlinedIcon />
                </IconButton>
            </Tooltip>
        </StyledFooter>
    );
};
