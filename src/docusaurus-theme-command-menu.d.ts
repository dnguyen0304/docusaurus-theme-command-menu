declare module '@docusaurus/theme-command-menu' {
    import { SxProps, Theme } from '@mui/material/styles';

    interface CommandMenuThemeConfig {
        readonly swizzleIsEnabled: boolean;
    }

    interface SlotData {
        readonly heading: string;
        readonly snippet: string;
        readonly sx?: SxProps<Theme>;
    }
}
