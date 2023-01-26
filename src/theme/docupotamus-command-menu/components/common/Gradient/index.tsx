import { Keyframes } from '@emotion/serialize';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

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

export default styled(Box)({
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

    // TODO(dnguyen0304): Investigate performance issues.
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationName: getAnimation(),
    animationTimingFunction: 'linear',
});
