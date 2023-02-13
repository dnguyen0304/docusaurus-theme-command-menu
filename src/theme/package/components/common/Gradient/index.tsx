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
> { };

export default styled(Box, {
    shouldForwardProp: (prop) => prop !== 'color',
})<StyledBoxProps>(({
    color = 'var(--ifm-color-primary-lightest)',
}) => ({
    width: '100%',
    height: '100%',

    background: `linear-gradient(
        to right,
        ${color},
        var(--ifm-color-white),
        ${color}
    )`,
    backgroundSize: '200%',
    overflow: 'hidden',

    // TODO(dnguyen0304): Investigate infinite animation-iteration-count.
    animationDuration: '3s',
    animationName: getAnimation(),
    animationTimingFunction: 'linear',
}));
