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

interface StyledBoxProps extends Pick<React.CSSProperties,
    | 'color'
    | 'animationDuration'
    | 'animationIterationCount'
> { };

export default styled(Box, {
    shouldForwardProp: (prop) =>
        prop !== 'color'
        && prop !== 'animationDuration'
        && prop !== 'animationIterationCount',
})<StyledBoxProps>(({
    color = 'var(--ifm-color-primary-lightest)',
    animationDuration = '3s',
    animationIterationCount = 1,
}) => ({
    width: '100%',
    height: '100%',

    background: `linear-gradient(
        to right,
        ${color},
        var(--cm-color-base),
        ${color}
    )`,
    backgroundSize: '200%',
    overflow: 'hidden',

    animationDuration,
    animationIterationCount,
    animationName: getAnimation(),
    animationTimingFunction: 'linear',
}));
