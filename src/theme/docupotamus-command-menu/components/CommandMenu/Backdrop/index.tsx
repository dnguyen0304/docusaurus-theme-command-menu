import { Keyframes } from '@emotion/serialize';
import MuiBackdrop, { BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import * as React from 'react';

const getAnimation = (): Keyframes => {
    return keyframes({
        from: {
            backgroundPosition: '0% center',
        },
        to: {
            backgroundPosition: '-200% center',
        },
    });
};

const Gradient = styled(Box)({
    width: '100%',
    height: '100%',

    background: `linear-gradient(
        to right,
        rgb(98, 0, 234),
        rgb(236, 64, 122),
        rgb(98, 0, 234)
    )`,
    backgroundSize: '200%',
    overflow: 'hidden',

    animationDuration: '5s',
    animationIterationCount: 'infinite',
    animationName: getAnimation(),
    animationTimingFunction: 'linear',
});

interface Props extends MuiBackdropProps { };

export default function Backdrop(props: Props): JSX.Element {
    return (
        <MuiBackdrop {...props}>
            <Gradient />
        </MuiBackdrop>
    );
};
