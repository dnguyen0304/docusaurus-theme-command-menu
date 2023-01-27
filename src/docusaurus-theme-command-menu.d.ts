declare module '@docusaurus/theme-command-menu' {

    interface CommandMenuThemeConfig {
        readonly swizzleIsEnabled: boolean;
    }

    interface SlotData {
        readonly heading: string;
        readonly snippet: string;
        readonly href: string;
    }

    interface TimelineEventData {
        // Created at time as a Unix epoch timestamp, in milliseconds.
        readonly timestampMilli: number;

        readonly type: TimelineEventType;
        readonly heading: string;

        // TODO(dnguyen0304): Add snippetMaxLength.
        readonly snippet: string;
        readonly href: string;
    }

    type TimelineEventType = 'Read';
}
