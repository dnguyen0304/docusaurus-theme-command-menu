import { SlotData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',

    position: 'absolute',

    // TODO(dnguyen0304): Remove development code.
    outline: '2px solid red',
    padding: 'var(--space-s)',

    // backgroundColor: 'rgba(255, 255, 255, 0.01)',
    // backdropFilter: 'blur(40px)',
    // backgroundClip: 'padding-box',
    // border: '2px solid transparent',
    // boxShadow: '10px 10px 10px rgba(46, 54, 68, 0.03)',
});

interface Props extends SlotData {
    readonly index: number;
};

export default function Slot(
    {
        index,
        description,
        sx,
    }: Props,
): JSX.Element {
    return (
        <StyledBox
            component='section'
            sx={{ ...sx }}
        >
            <h2 style={{ margin: 0 }}>{description || `Slot ${index}`}</h2>
            <p style={{ margin: 'auto 0' }}>Heading: snippet</p>
        </StyledBox>
    );
};
