import type { ShortcutData } from '@docusaurus/theme-command-menu';
import * as React from 'react';
import URI from 'urijs';
import { useShortcuts } from '../contexts/shortcuts';

export default function useShortcutsOnPage(): ShortcutData[] {
    const { shortcuts } = useShortcuts();

    const [onPage, setOnPage] = React.useState<ShortcutData[]>([]);

    React.useEffect(() => {
        const currentPath = new URI().path();
        setOnPage(
            shortcuts.filter(x => new URI(x.source.href).path() === currentPath)
        );
    }, [shortcuts]);

    return onPage;
};
