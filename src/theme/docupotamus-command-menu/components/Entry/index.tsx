import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Gradient from '../common/Gradient';
// import Logo from './Logo';

const ClippingBox = styled(Box)({
    width: '100px',
    height: '100px',

    position: 'fixed',
    bottom: 0,

    backgroundColor: 'red',
});

const Circle = styled(Box)({
    width: '90%',
    aspectRatio: '1 / 1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',

    position: 'absolute',
    bottom: '0',
    left: '50%',
    translate: '-50% 50%',

    backgroundColor: 'var(--docupotamus-color-grey-100)',
    borderRadius: '40%',
});

export default function Entry(): JSX.Element {
    return (
        <ClippingBox>
            <Gradient />
            <Circle>
                {/* <Logo
                    fill='#fff'
                    viewBox='100 700 1600 600'
                    width='80%'
                /> */}
            </Circle>
        </ClippingBox>
    );
};
