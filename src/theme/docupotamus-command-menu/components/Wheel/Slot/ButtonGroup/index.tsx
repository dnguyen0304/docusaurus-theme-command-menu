import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

export default function ButtonGroup(): JSX.Element {
    return (
        <Box
            component='footer'
            sx={{
                color: 'rgba(255, 255, 255, 0.1)'
            }}
        >
            <IconButton
                aria-label='copy'
                color='inherit'
            >
                <ContentCopyOutlinedIcon />
            </IconButton>
            <IconButton
                aria-label='open in a new tab'
                color='inherit'
            >
                <OpenInNewOutlinedIcon />
            </IconButton>
        </Box>
    );
};
