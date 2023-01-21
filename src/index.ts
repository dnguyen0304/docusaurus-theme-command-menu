import type { Plugin } from '@docusaurus/types';

export default function themeCommandMenu(): Plugin<undefined> {
    return {
        name: 'docusaurus-theme-command-menu',

        getThemePath() {
            return '../lib/theme';
        },

        getTypeScriptThemePath() {
            return '../src/theme';
        },
    };
};

export { validateThemeConfig } from './validateThemeConfig';

export const getSwizzleComponentList = (): string[] => [];
