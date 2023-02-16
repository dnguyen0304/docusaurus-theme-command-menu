import MuiBackdrop, { BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TILE_BORDER_WIDTH_PX } from '../../../constants';
import Gradient from '../../common/Gradient';

const Tile = styled(Box)({
    width: '100%',
    height: '100%',

    position: 'absolute',
    '&:before': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'var(--cm-color-background)',
        inset: `${TILE_BORDER_WIDTH_PX}px`,
    },
});

interface Props extends MuiBackdropProps { };

export default function Backdrop(props: Props): JSX.Element {
    return (
        <MuiBackdrop {...props}>
            <Gradient />
            <Tile onClick={props.onClick} />
        </MuiBackdrop>
    );
};
