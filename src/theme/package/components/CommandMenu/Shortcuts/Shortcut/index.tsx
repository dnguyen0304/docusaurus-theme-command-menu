import { ShortcutData } from '@docusaurus/theme-command-menu';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useAddressBar } from '../../../../contexts/address-bar';
import { useShortcuts } from '../../../../contexts/shortcuts';
import ButtonGroup from './ButtonGroup';
import styles from './styles.module.css';

const BORDER_WIDTH: React.CSSProperties['borderWidth'] = '8px';
const TRANSITION_DURATION: React.CSSProperties['transitionDuration'] = '0.3s';

const GlassStyles: React.CSSProperties = {
    backgroundColor: 'hsla(var(--cm-color-background-hsl), 0.6)',
    backdropFilter: 'blur(6px) saturate(100%) brightness(140%)',
    WebkitBackdropFilter: 'blur(6px) saturate(100%) brightness(140%)',
    boxShadow: `
        0px 0px 12px 0px rgba(136, 165, 191, 0.48),
        0px 0px 12px 0px hsla(var(--cm-color-base-hsl), 0.8)
    `,
};

interface StyledCardProps {
    readonly hasContent: boolean;
};

const StyledCard = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hasContent',
})<StyledCardProps>(({ hasContent }) => ({
    ...GlassStyles,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    border: `
        ${BORDER_WIDTH}
        solid
        ${hasContent
            ? 'hsla(var(--cm-color-base-hsl), 0.9)'
            : 'transparent'
        }
    `,
    borderRadius: 'var(--cm-border-radius-roundest)',
    padding: 'var(--d9s-space-m)',
    // TODO(dnguyen0304): Investigate improving performance.
    '&:hover': {
        backdropFilter: 'blur(6px) saturate(100%) brightness(200%)',
        boxShadow: `
            0px 0px 24px 0px rgba(136, 165, 191, 0.7),
            0px 0px 24px 0px hsla(var(--cm-color-base-hsl), 0.9)
        `,
        transition: `all ${TRANSITION_DURATION} ease-in-out`,
        transitionProperty: 'backdrop-filter, box-shadow',
    },
    '&:hover > .MuiBox-root': {
        // TODO(dnguyen0304): Fix flakiness.
        opacity: 1,
    },
    '& h3': {
        marginBottom: 'var(--space-3xs)',
    },
    '& p': {
        color: 'var(--cm-color-base-darker)',
    },
}));

const StyledInput = styled(InputBase)({
    color: 'inherit',
    font: 'inherit',
    padding: 0,
});

interface Props extends ShortcutData {
    readonly index: number;
};

// TODO(dnguyen0304): Fix missing responsive design.
export default function Shortcut(
    {
        index,
        heading,
        snippet,
        href,
    }: Props,
): JSX.Element {
    const { setHref } = useAddressBar();
    const { dispatchShortcuts } = useShortcuts();

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        dispatchShortcuts({
            type: 'setShortcutHeading',
            index,
            newValue: event.target.value,
        });
    };

    return (
        <StyledCard
            className={styles.Shortcut_card}
            component='section'
            hasContent={!!href}
            onMouseEnter={() => setHref(href)}
            onMouseLeave={() => setHref('')}
        >
            <h3>
                <StyledInput
                    autoComplete='off'
                    maxRows={Infinity}
                    onChange={handleDescriptionChange}
                    value={href ? heading : 'EMPTY SHORTCUT'}
                    multiline
                />
            </h3>
            <p className={styles.text__multilineTruncate}>
                {href ? snippet : 'Create a shortcut to your favorite content.'}
            </p>
            {href && <ButtonGroup
                copyText={snippet}
                href={href}
                shortcutIndex={index}
                shortcutBorderWidth={BORDER_WIDTH}
            />}
        </StyledCard>
    );
};
