import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import History from '../History';
import Wheel from '../Wheel';
import './styles.css';

const StyledModal = styled(Modal)({
    // TODO(dnguyen0304): Replace temporary placeholder stub.
    color: 'white',
    '& .MuiBackdrop-root': {
        backdropFilter: 'blur(5px) saturate(30%)',
        WebkitBackdropFilter: 'blur(5px) saturate(30%)',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
    },
});

const GridContainer = styled(Box)({
    height: '100vh',
    display: 'grid',
    gridTemplate: 'auto 1fr auto / auto 1fr auto',
    gridTemplateAreas:
        '"header header header" ' +
        '"left-sidebar wheel history" ' +
        '"footer footer footer"',
});

interface Props { };

export default function CommandMenu({ }: Props): JSX.Element {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);

    return (
        <StyledModal
            onClose={() => setIsOpen(false)}
            open={isOpen}
            // Override the default Chrome outline behavior.
            // See: https://github.com/mui/material-ui/issues/11504#issuecomment-390506409
            disableAutoFocus
        >
            <GridContainer>
                <header style={{ gridArea: 'header' }}>Header</header>
                <div style={{ gridArea: 'left-sidebar' }}>Left Sidebar</div>
                <Wheel sx={{ gridArea: 'wheel' }} />
                <History sx={{ gridArea: 'history' }} />
                <footer style={{ gridArea: 'footer' }}>Footer</footer>
            </GridContainer>
        </StyledModal>
    );
};
