import type { CommandMenuThemeConfig } from '@docusaurus/theme-command-menu';
import type {
    ThemeConfig,
    ThemeConfigValidationContext
} from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

declare module '@docusaurus/types' {
    interface ThemeConfig {
        docupotamusCommandMenu: CommandMenuThemeConfig;
    }
};

const DEFAULT_THEME_CONFIG: CommandMenuThemeConfig = {
    swizzleIsEnabled: true,
};

// TODO(dnguyen0304): Investigate missing labels.
// TODO(dnguyen0304): Fix incorrect ThemeConfig type.
export const ThemeConfigSchema = Joi.object<ThemeConfig>({
    docupotamusCommandMenu: Joi.object({
        swizzleIsEnabled: Joi
            .boolean()
            .default(DEFAULT_THEME_CONFIG.swizzleIsEnabled),
    })
        .label('themeConfig.docupotamusCommandMenu')
        .default(DEFAULT_THEME_CONFIG),
});

export const validateThemeConfig = ({
    validate,
    themeConfig,
}: ThemeConfigValidationContext<ThemeConfig>): ThemeConfig => {
    return validate(ThemeConfigSchema, themeConfig);
};
