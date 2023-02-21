import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useSelection } from '../../../contexts/selection';
import { SelectionTopCenterPositioner } from '../../../services/annotate/tooltip/positioner';
import * as rangeUtils from '../../../services/annotate/utils/range'; /* TODO(dnguyen0304): Fix missing type declaration. */
import StarButton from './StarButton';

const StyledBox = styled(Box)({
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    zIndex: 'calc(var(--ifm-z-index-fixed) + 1)',

    display: 'flex',
    alignItems: 'center',

    backgroundColor: 'var(--cm-annotater-color-background)',
    borderRadius: '8px',
    padding: '6px 10px',
    transition: '0.2s all',
    '&::after': {
        content: '""',
        width: 0,
        height: 0,

        position: 'absolute',
        bottom: '-5px',
        left: '50%',
        transform: 'translateX(-50%)',

        borderTop: '6px solid var(--cm-annotater-color-background)',
        borderRight: '6px solid transparent',
        borderLeft: '6px solid transparent',
    },
    '& button.MuiIconButton-root': {
        color: 'var(--cm-annotater-color)',
    },
    '& button.MuiIconButton-root:disabled': {
        color: 'hsla(var(--cm-annotater-color-hsl), 0.4)',
    },
});

export default function ButtonGroup(): JSX.Element {
    const { range } = useSelection();

    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [positionTopPx, setPositionTopPx] = React.useState<number>(0);
    const [positionLeftPx, setPositionLeftPx] = React.useState<number>(0);

    React.useEffect(() => {
        if (range) {
            const selection = document.getSelection()!;
            const focusRect = rangeUtils.selectionFocusRect(selection);
            if (!focusRect) {
                // The selected range does not contain any text.
                return;
            }
            const isBackwards = rangeUtils.isSelectionBackwards(selection);
            const { left, top } = new SelectionTopCenterPositioner().position(
                focusRect,
                isBackwards,
            );
            setIsVisible(true);
            setPositionTopPx(top);
            setPositionLeftPx(left);
        } else {
            setIsVisible(false);
        }
    }, [range]);

    return (
        <StyledBox
            sx={{
                top: `${positionTopPx}px`,
                left: `${positionLeftPx}px`,
                visibility: isVisible ? 'visible' : 'hidden',
            }}
        // onMouseDown={e => e.preventDefault()}
        // role='presentation'
        >
            <StarButton />
        </StyledBox>
    );
};
