import { RangeAnchor } from '@docupotamus/docusaurus-lib-common/annotate/anchor';
import * as React from 'react';
import Annotater from '../../../package/components/Annotater';
import { SEARCH_PARAM_SELECTOR_ENCODED } from '../../../package/constants';
import { SelectionProvider } from '../../../package/contexts/selection';

const scrollToRange = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const selectorEncoded = searchParams.get(SEARCH_PARAM_SELECTOR_ENCODED);
    if (!selectorEncoded) {
        return;
    }
    const selector = JSON.parse(atob(selectorEncoded));
    const range =
        RangeAnchor
            .fromSelector(document.body, selector)
            .toRange();
    // TODO(dnguyen0304): Investigate different approach.
    //   See: http://roysharon.com/blog/37
    range.startContainer.parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
};

interface Props {
    readonly children: React.ReactNode;
};

export default function ContentDecorator({ children }: Props): JSX.Element {
    React.useEffect(() => {
        // TODO(dnguyen0304): Investigate the differences between
        //   DOMContentLoaded, load, and readystatechange.
        if (document.readyState === 'complete') {
            scrollToRange();
            return;
        } else {
            window.addEventListener('load', scrollToRange);
            return () => window.removeEventListener('load', scrollToRange);
        }
    }, []);

    return (
        <SelectionProvider>
            {children}
            <Annotater />
        </SelectionProvider>
    );
};
