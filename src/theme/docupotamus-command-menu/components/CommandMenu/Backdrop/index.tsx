import { Keyframes } from '@emotion/serialize';
import MuiBackdrop, { BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import * as React from 'react';
import { TILE_BORDER_WIDTH_PX } from '../../../constants';
import useDomRect from '../../../hooks/useDomRect';

const TILE_SIZE_PX: number = 100;

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
        backgroundColor: 'var(--docupotamus-color-grey-100)',
        inset: `${TILE_BORDER_WIDTH_PX}px`,
    },
    '&:hover:before': {
        backgroundColor: 'rgb(34, 50, 80)',
    },
});

interface Props extends MuiBackdropProps { };

export default function Backdrop(props: Props): JSX.Element {
    const [tileCount, setTileCount] = React.useState<number>(0);

    const tilesRef = React.useRef<HTMLDivElement>();
    const domRect = useDomRect<HTMLDivElement>(tilesRef);

    React.useEffect(() => {
        if (domRect === undefined) {
            return;
        }
        const columnCount = Math.floor(domRect.width / TILE_SIZE_PX);
        const rowCount = Math.floor(domRect.height / TILE_SIZE_PX);
        setTileCount(columnCount * rowCount);
    }, [domRect]);

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
