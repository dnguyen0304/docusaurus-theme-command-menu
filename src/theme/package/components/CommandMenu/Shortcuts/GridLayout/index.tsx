import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default styled(Box)({
    ['--spacing']: 'var(--d9s-space-m-l)',

    display: 'grid',
    gridGap: 'var(--spacing)',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 30%))',
    justifyContent: 'center',
    alignContent: 'center',

    overflowY: 'auto',
    padding: 'var(--spacing)',
    paddingLeft: 'var(--d9s-space-l-xl)',
    ['& > *']: {
        aspectRatio: '1 / 1',
    },
});
