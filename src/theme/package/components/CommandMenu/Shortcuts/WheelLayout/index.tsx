import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import styles from '../styles.module.css';

export const className = styles.Shortcut__wheel;

export default styled(Box)({
    // TODO(dnguyen0304): Fix missing responsive design.
    width: '25%',
    minWidth: '100px',
    aspectRatio: '3 / 2.5',

    position: 'relative',
    placeSelf: 'center',

    color: 'var(--cm-color-base)',
});
