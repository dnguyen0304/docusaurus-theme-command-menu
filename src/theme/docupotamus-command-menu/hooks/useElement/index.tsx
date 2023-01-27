// TODO(dnguyen0304): Extract to a centralized location to facilitate
//   maintenance.

import * as React from 'react';

async function getElement(selector: string): Promise<Element> {
    return new Promise(resolve => {
        const element = document.querySelector(selector);
        if (element) {
            return resolve(element);
        }
        const observer = new MutationObserver(_mutations => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                observer.disconnect();
            }
        });
        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            },
        );
    });
};

export default function useElement(selector: string): Element | undefined {
    const [element, setElement] = React.useState<Element>();

    React.useEffect(() => {
        (async () => setElement(await getElement(selector)))();
    }, []);

    return element;
};
