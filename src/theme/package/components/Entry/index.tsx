import Box from '@mui/material/Box';
import TouchRipple, { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useCommandMenu } from '../../contexts/command-menu';
import Gradient from '../common/Gradient';
import Logo from './Logo';
import styles from './styles.module.css';

const ClippingBox = styled(Box)({
    width: '100px',
    height: '100px',

    position: 'absolute',
    bottom: 0,
    left: '50%',
    translate: '-50%',

    clipPath: 'circle(40% at 50% 100%)',

    [`&:hover .${styles.circle}::before`]: {
        backgroundColor: 'var(--d9s-color-content-inverse-hover)',
        transition: 'var(--ifm-hover-overlay-transition)',
    },
});

export default function Entry(): JSX.Element {
    const { setIsOpen } = useCommandMenu();

    const rippleRef = React.useRef<TouchRippleActions>(null);

    const startRipple = (event: React.SyntheticEvent) => {
        rippleRef.current?.start(event);
    };

    const stopRipple = (event: React.SyntheticEvent) => {
        rippleRef.current?.stop(event);
    };

    return (
        <ClippingBox>
            <Gradient
                color='var(--cm-entry-gradient-color-background)'
                animationDuration='6s'
                animationIterationCount='infinite'
            />
            <Box
                className={styles.circle}
                onClick={() => setIsOpen(true)}
                onMouseDown={startRipple}
                onMouseUp={stopRipple}
                onMouseOut={stopRipple}
            >
                <Logo
                    className={styles.Logo}
                    viewBox='140 700 1600 600'
                />
            </Box>
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
