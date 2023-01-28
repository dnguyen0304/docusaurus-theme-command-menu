import type { CommandMenuThemeConfig } from '@docusaurus/theme-command-menu';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useCommandMenuThemeConfig(): CommandMenuThemeConfig {
    return (
        useDocusaurusContext()
            .siteConfig
            .themeConfig
            .docupotamusCommandMenu
    ) as CommandMenuThemeConfig;
};
