import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Timeline({ sx }: Props): JSX.Element {
    return (
        <Box sx={{ ...sx }}>
            Timeline
        </Box>
    );
};
