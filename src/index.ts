import type { PluginOptions } from '@docusaurus/theme-command-menu';
import type { LoadContext, Plugin } from '@docusaurus/types';

export default function themeCommandMenu(
    _context: LoadContext,
    options: PluginOptions,
): Plugin<undefined> {
    const name = 'command-menu';

    const { swizzleIsEnabled } = options;

    return {
        name: `docusaurus-theme-${name}`,

        getThemePath() {
            if (swizzleIsEnabled) {
                return `../lib/theme/docupotamus-${name}/theme`;
            }
            return '../lib/theme';
        },

        getTypeScriptThemePath() {
            if (swizzleIsEnabled) {
                return `../src/theme/docupotamus-${name}/theme`;
            }
            return '../src/theme';
        },
    };
};

export { validateThemeConfig } from './validateThemeConfig';

export const getSwizzleComponentList = (): string[] => [];
