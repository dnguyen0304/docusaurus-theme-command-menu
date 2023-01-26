import Box from '@mui/material/Box';
import TouchRipple, { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple';
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
    const rippleRef = React.useRef<TouchRippleActions>(null);

    const startRipple = (event: React.SyntheticEvent) => {
        if (!rippleRef.current) {
            return;
        }
        rippleRef.current.start(event);
    };

    const stopRipple = (event: React.SyntheticEvent) => {
        if (!rippleRef.current) {
            return;
        }
        rippleRef.current?.stop(event);
    };

    return (
        <ClippingBox>
            <Gradient />
            <Circle
                onMouseDown={startRipple}
                onMouseUp={stopRipple}
            >
                <Logo
                    className={styles.Logo}
                    viewBox='100 700 1600 600'
                />
            </Circle>
            <TouchRipple
                ref={rippleRef}
                center={false}
                classes={{
                    child: styles.MuiTouchRipple_childOverride,
                }}
            />
        </ClippingBox>
    );
};
