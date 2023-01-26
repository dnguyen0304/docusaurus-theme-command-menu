import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Gradient from '../common/Gradient';

const ClippingBox = styled(Box)({
    width: '100px',
    height: '100px',

    position: 'fixed',
    bottom: 0,

    backgroundColor: 'red',
});

export default function Entry(): JSX.Element {
    return (
        <ClippingBox>
            <Gradient />
        </ClippingBox>
    );
};
