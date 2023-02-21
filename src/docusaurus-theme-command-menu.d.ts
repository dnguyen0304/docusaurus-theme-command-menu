declare module '@docupotamus/docusaurus-theme-command-menu' {
    import type { Target } from '@docupotamus/docusaurus-lib-common';
    import type { KeySequence } from 'react-hotkeys';

    interface PluginOptions {
        readonly swizzleIsEnabled: boolean;
    }

    interface CommandMenuThemeConfig { }

    interface ShortcutData extends Omit<Target, 'id' | 'selectorRoot'> {
        readonly heading: string;
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

    type KeyBindings =
        | 'COMMAND_MENU_CLOSE'
        | 'COMMAND_MENU_OPEN';

    type KeyMap = {
        [key in KeyBindings]: KeySequence;
    };

    type KeyHandlers = {
        [key in KeyBindings]: (
            keyboardEvent?: KeyboardEvent | undefined,
        ) => void;
    };
}

declare module '@docusaurus/theme-command-menu' {
    export * from '@docupotamus/docusaurus-theme-command-menu';
}
