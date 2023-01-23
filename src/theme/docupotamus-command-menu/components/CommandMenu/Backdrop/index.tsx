import MuiBackdrop, { BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';
import * as React from 'react';

interface Props extends MuiBackdropProps { };

export default function Backdrop(props: Props): JSX.Element {
    return (
        <MuiBackdrop {...props}>
        </MuiBackdrop>
    );
};
