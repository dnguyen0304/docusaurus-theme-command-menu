import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';

interface StyledBoxProps {
    readonly size: React.CSSProperties['width' | 'height'];
};

const StyledBox = styled(Box)<StyledBoxProps>(({ size }) => ({
    width: size,
    height: size,

    border: '3px solid var(--docupotamus-color-grey-800)',
    borderRadius: '50%',
}));

const getPosition = (
    linePositionLeft: React.CSSProperties['left'],
    lineWidthPx: number,
    parentPaddingTop: React.CSSProperties['paddingTop'],
): Pick<React.CSSProperties, 'position' | 'top' | 'left' | 'translate'> => {
    return {
        position: 'absolute',
        // TODO(dnguyen0304): Investigate if this can be done programmatically.
        top: `calc(${parentPaddingTop} + 2px)`,
        left: linePositionLeft,
        translate: `calc(-50% + ${lineWidthPx / 2}px) 0`,
    };
};

interface Props {
    lineNotColoredBackgroundColor: React.CSSProperties['backgroundColor'];
    linePositionLeft: React.CSSProperties['left'];
    lineWidthPx: number;
    parentPaddingTop: React.CSSProperties['paddingTop'];
    timelineMouseClientY: number;
};

export default function Event(
    {
        lineNotColoredBackgroundColor,
        linePositionLeft,
        lineWidthPx,
        parentPaddingTop,
        timelineMouseClientY,
    }: Props,
): JSX.Element {
    const [backgroundColor, setBackgroundColor] = React.useState<
        React.CSSProperties['backgroundColor']
    >(lineNotColoredBackgroundColor);

    const ref = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        if (!ref.current) {
            return;
        }
        const newBackgroundColor =
            (timelineMouseClientY >= ref.current.getBoundingClientRect().top)
                // TODO(dnguyen0304): Extract to a centralized location to
                //   facilitate maintenance.
                ? 'rgb(98, 0, 234)'
                : lineNotColoredBackgroundColor;
        setBackgroundColor(newBackgroundColor);
    }, [timelineMouseClientY]);

    return (
        <StyledBox
            ref={ref}
            size='var(--font-size--1)'
            sx={{
                ...getPosition(linePositionLeft, lineWidthPx, parentPaddingTop),
                backgroundColor,
            }}
        />
    );
};
