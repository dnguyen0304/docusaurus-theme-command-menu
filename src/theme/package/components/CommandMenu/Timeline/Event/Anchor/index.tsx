import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

interface StyledBoxProps {
    readonly size: React.CSSProperties['width' | 'height'];
};

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'size'
})<StyledBoxProps>(({ size }) => ({
    width: size,
    height: size,

    border: '3px solid var(--cm-color-base)',
    borderRadius: '50%',
}));

const getPosition = (
    linePositionLeft: React.CSSProperties['left'],
    eventPaddingTop: React.CSSProperties['paddingTop'],
): Pick<React.CSSProperties, 'position' | 'top' | 'left' | 'translate'> => {
    return {
        position: 'absolute',
        // TODO(dnguyen0304): Investigate if this can be done programmatically.
        top: `calc(${eventPaddingTop} + 3.5px)`,
        left: linePositionLeft,
        translate: 'calc(-50% + var(--cm-line-width) / 2) 0',
    };
};

interface Props {
    zIndex: React.CSSProperties['zIndex'];
    lineNotColoredBackgroundColor: React.CSSProperties['backgroundColor'];
    linePositionLeft: React.CSSProperties['left'];
    eventPaddingTop: React.CSSProperties['paddingTop'];
    timelineMouseClientY: number;
};

export default function Event(
    {
        zIndex,
        lineNotColoredBackgroundColor,
        linePositionLeft,
        eventPaddingTop,
        timelineMouseClientY,
    }: Props,
): JSX.Element {
    const [backgroundColor, setBackgroundColor] = React.useState<
        React.CSSProperties['backgroundColor']
    >(lineNotColoredBackgroundColor);

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!ref.current) {
            return;
        }
        const newBackgroundColor =
            (timelineMouseClientY >= ref.current.getBoundingClientRect().top)
                ? 'var(--cm-line-color-background)'
                : lineNotColoredBackgroundColor;
        setBackgroundColor(newBackgroundColor);
    }, [timelineMouseClientY]);

    return (
        <StyledBox
            ref={ref}
            size='var(--d9s-font-size-0)'
            sx={{
                ...getPosition(linePositionLeft, eventPaddingTop),
                backgroundColor,
                zIndex,
            }}
        />
    );
};
