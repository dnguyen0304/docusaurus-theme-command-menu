import { Keyframes } from '@emotion/serialize';
import MuiBackdrop, { BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import * as React from 'react';

const TILE_SIZE_PX: number = 100;
const TILE_BORDER_WIDTH_PX: number = 0.5;

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

const Gradient = styled(Box)({
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

    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationName: getAnimation(),
    animationTimingFunction: 'linear',
});

const TilesLayout = styled(Box)({
    position: 'absolute',
    width: `calc(100% - ${TILE_BORDER_WIDTH_PX}px)`,
    height: `calc(100% - ${TILE_BORDER_WIDTH_PX}px)`,

    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${TILE_SIZE_PX}px, 1fr))`,
    gridTemplateRows: `repeat(auto-fit, minmax(${TILE_SIZE_PX}px, 1fr))`,
});

const Tile = styled(Box)({
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'rgb(15, 15, 15)',
        inset: `${TILE_BORDER_WIDTH_PX}px`,
    },
});

const getViewportWidth = (): number => {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
};

const getViewportHeight = (): number => {
    return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
};

interface Props extends MuiBackdropProps { };

export default function Backdrop(props: Props): JSX.Element {
    const [tileCount, setTileCount] = React.useState<number>(0);

    const tilesRef = React.useRef();

    React.useEffect(() => {
        const columnCount = Math.floor(getViewportWidth() / TILE_SIZE_PX);
        const rowCount = Math.floor(getViewportHeight() / TILE_SIZE_PX);
        setTileCount(columnCount * rowCount);
    }, []);

    return (
        <MuiBackdrop {...props}>
            <Gradient />
            <TilesLayout ref={tilesRef}>
                {[...Array(tileCount)].map((_, i) =>
                    <Tile
                        key={`tile-${i}`}
                        onClick={props.onClick}
                    />
                )}
            </TilesLayout>
        </MuiBackdrop>
    );
};
