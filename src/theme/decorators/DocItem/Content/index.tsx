import {
    RangeAnchor
} from '@docupotamus/docusaurus-lib-common/annotate/anchor';
import * as React from 'react';
import Annotater from '../../../package/components/Annotater';
import { SEARCH_PARAM_SELECTOR_ENCODED } from '../../../package/constants';
import {
    SelectionProvider,
    useSelection
} from '../../../package/contexts/selection';
import { useShortcuts } from '../../../package/contexts/shortcuts';
import useShortcutsOnPage from '../../../package/hooks/useShortcutsOnPage';
import styles from './styles.module.css';

// TODO(dnguyen0304): Extract to package to minimize code in decorators.
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
    const startElement = range.startContainer.parentElement
    startElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
    startElement?.classList?.remove(styles.target__flicker ?? '');
    startElement?.classList?.add(styles.target__flicker ?? '');
};

const rangeContainsNode = (range: Range, node: Node): boolean => {
    try {
        const length = node.nodeValue?.length ?? node.childNodes.length;
        const nodeStartIsBeforeRangeEnd = range.comparePoint(node, 0) <= 0;
        const nodeEndIsAfterRangeStart = range.comparePoint(node, length) >= 0;
        return nodeStartIsBeforeRangeEnd && nodeEndIsAfterRangeStart;
    } catch (e) {
        // Range.comparePoint fails if the range and node do not share an
        // ancestor or if node is a DOCUMENT_TYPE_NODE.
        return false;
    }
};

interface Props {
    readonly children: React.ReactNode;
};

const Inner = ({ children }: Props): JSX.Element => {
    const { range: activeRange } = useSelection();
    const { setIntersectedShortcutIndex } = useShortcuts();
    const shortcutsOnPage = useShortcutsOnPage();

    React.useEffect(() => {
        if (!activeRange) {
            setIntersectedShortcutIndex(undefined);
            return;
        }
        // "If the startContainer is a Node of type Text, Comment, or
        // CDATASection, then the offset is the number of characters from the
        // start of the startContainer to the boundary point of the Range."
        //
        // See: https://developer.mozilla.org/en-US/docs/Web/API/Range/startOffset
        const startIsText = activeRange.startContainer.nodeType === Node.TEXT_NODE;
        const endIsText = activeRange.endContainer.nodeType === Node.TEXT_NODE;
        if (!startIsText || !endIsText) {
            console.warn('Saving shortcuts for non-text Nodes is not yet implemented.');
            return;
        }
        for (let i = 0; i < shortcutsOnPage.length; ++i) {
            const selector = shortcutsOnPage[i]?.selectors[0];
            if (!selector) {
                // TODO(dnguyen0304): Add error handling.
                return;
            }
            const shortcutRange =
                RangeAnchor
                    .fromSelector(document.body, selector)
                    .toRange();
            // Use activeRange.isPointInRange instead of
            //   shortcutRange.isPointInRange to handle the case where the
            //   activeRange contains the entire shortcutRange.
            //
            // isPointInRange returns true for ranges that are immediately
            //   adjacent. For example:
            //   Given:     <p>HelloWorld</p>
            //   range1:    Hello
            //   range2:    World
            //   Returns:   true
            const intersectsStart = activeRange.isPointInRange(
                shortcutRange.startContainer,
                shortcutRange.startOffset,
            );
            const intersectsEnd = activeRange.isPointInRange(
                shortcutRange.endContainer,
                shortcutRange.endOffset,
            );
            if (intersectsStart || intersectsEnd) {
                setIntersectedShortcutIndex(i);
                return;
            }
        }
        setIntersectedShortcutIndex(undefined);
    }, [activeRange, shortcutsOnPage]);

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
        <>
            {children}
            <Annotater />
        </>
    );
};

export default function ContentDecorator({ children }: Props): JSX.Element {
    return (
        <SelectionProvider>
            <Inner>
                {children}
            </Inner>
        </SelectionProvider>
    );
};
