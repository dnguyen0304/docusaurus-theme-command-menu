import Box from '@mui/material/Box';
import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import AddressBar from './AddressBar';

const Layout = styled(Box)({
    width: '100%',
    height: 'var(--cm-footer-height)',

    // TODO(dnguyen0304): Investigate why this or z-index: 0 is needed for the
    //   timeline to be visible.
    position: 'relative',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',

    marginBottom: 'var(--cm-backdrop-inset-buffer)',
    marginLeft: 'var(--cm-backdrop-inset-buffer)',
});

interface Props {
    readonly sx?: SxProps<Theme>;
};

export default function Footer({ sx }: Props): JSX.Element {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // On rendering the command menu, set the focus here (or any child
        // element) so global keyboard shortcuts work.
        ref.current?.focus();
    }, []);

    return (
        <Layout
            ref={ref}
            sx={sx}
        >
            <AddressBar />
        </Layout>
    );
};
