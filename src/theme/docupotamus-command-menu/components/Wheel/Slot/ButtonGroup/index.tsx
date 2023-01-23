import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledFooter = styled(Box)({
    color: 'rgba(255, 255, 255, 0.1)',
});

export default function ButtonGroup(): JSX.Element {
    return (
        <StyledFooter component='footer'>
            <IconButton aria-label='copy'>
                <ContentCopyOutlinedIcon />
            </IconButton>
            <IconButton aria-label='open in a new tab'>
                <OpenInNewOutlinedIcon />
            </IconButton>
        </StyledFooter>
    );
};
