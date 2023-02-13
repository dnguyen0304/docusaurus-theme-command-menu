import useResizeObserver from '@react-hook/resize-observer';
import * as React from 'react';

export default function useDomRect<T extends HTMLElement>(
    target: React.MutableRefObject<T | null>,
): DOMRect | undefined {
    const [domRect, setDomRect] = React.useState<DOMRect>();

    React.useLayoutEffect(() => {
        setDomRect(target.current?.getBoundingClientRect())
    }, [target]);

    useResizeObserver(target, (entry) => setDomRect(entry.contentRect));

    return domRect;
};
