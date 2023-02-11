import type { PluginOptions } from '@docusaurus/theme-command-menu';
import type { LoadContext, Plugin } from '@docusaurus/types';

export default function themeCommandMenu(
    _context: LoadContext,
    options: PluginOptions,
): Plugin<undefined> {
    const { swizzleIsEnabled = true } = options;

    return {
        name: `docupotamus-theme-command-menu`,

        getThemePath() {
            if (swizzleIsEnabled) {
                return `../lib/theme/swizzle`;
            }
            return '../lib/public';
        },

        getTypeScriptThemePath() {
            if (swizzleIsEnabled) {
                return `../src/theme/swizzle`;
            }
            return '../src/public';
        },
    };
};

export { validateThemeConfig } from './validateThemeConfig';

export const getSwizzleComponentList = (): string[] => [];
