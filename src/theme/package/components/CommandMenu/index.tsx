import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useCommandMenu } from '../../contexts/command-menu';
import Backdrop from './Backdrop';
import Footer from './Footer';
import Timeline from './Timeline';
import Wheel from './Wheel';

const Layout = styled(Box)({
    height: '100vh',
    display: 'grid',
    gridTemplate: 'auto 1fr auto / auto 1fr max(250px, 25%)',
    gridTemplateAreas:
        '"header header timeline" ' +
        '"wheel wheel timeline" ' +
        '"footer footer timeline"',
});

export default function CommandMenu(): JSX.Element {
    const { isOpen, setIsOpen } = useCommandMenu();

    return (
        <Modal
            onClose={() => setIsOpen(false)}
            open={isOpen}
            slots={{ backdrop: Backdrop }}
            sx={{ color: 'var(--cm-color-base)' }}
            // Override the default Chrome outline behavior.
            // See: https://github.com/mui/material-ui/issues/11504#issuecomment-390506409
            disableAutoFocus
        >
            <Layout>
                <header style={{ gridArea: 'header' }}>Header</header>
                <Wheel sx={{ gridArea: 'wheel' }} />
                <Timeline sx={{ gridArea: 'timeline' }} />
                <Footer sx={{ gridArea: 'footer' }} />
            </Layout>
        </Modal>
    );
};
