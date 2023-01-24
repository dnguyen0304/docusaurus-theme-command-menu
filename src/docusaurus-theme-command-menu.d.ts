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

    interface TimelineEventData {
        // Created at time as a Unix epoch timestamp, in milliseconds.
        readonly timestampMilli: number;

        readonly type: TimelineEventType;
        readonly heading: string;

        // TODO(dnguyen0304): Add snippetMaxLength.
        readonly snippet: string;
    }

    type TimelineEventType = 'Read';
}
