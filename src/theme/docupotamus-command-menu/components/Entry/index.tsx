import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Gradient from '../common/Gradient';
import Logo from './Logo';
import styles from './styles.module.css';

const ClippingBox = styled(Box)({
    width: '100px',
    height: '100px',

    position: 'fixed',
    bottom: 0,

    backgroundColor: 'red',
});

const Circle = styled(Box)({
    width: '70%',
    aspectRatio: '1 / 1',

    position: 'absolute',
    bottom: '0',
    left: '50%',
    translate: '-50% 50%',

    backgroundColor: 'var(--docupotamus-color-grey-100)',
    borderRadius: '50%',
});

export default function Entry(): JSX.Element {
    return (
        <ClippingBox>
            <Gradient />
            <Circle>
                <Logo
                    className={styles.Logo}
                    viewBox='100 700 1600 600'
                />
            </Circle>
        </ClippingBox>
    );
};
