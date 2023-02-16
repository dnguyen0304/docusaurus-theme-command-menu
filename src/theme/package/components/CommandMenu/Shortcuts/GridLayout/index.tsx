import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import styles from './styles.module.css';

export const className = styles.Shortcut__grid;

export default styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
});
