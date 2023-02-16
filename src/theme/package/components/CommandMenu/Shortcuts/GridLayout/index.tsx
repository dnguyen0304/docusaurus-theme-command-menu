import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default styled(Box)({
    ['--spacing']: 'var(--d9s-space-m-l)',

    display: 'grid',
    gridGap: 'var(--spacing)',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 30%))',
    justifyContent: 'center',

    padding: 'var(--spacing)',
});
