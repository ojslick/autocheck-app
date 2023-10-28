import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useRef, useState } from 'react';
import { Typography } from './Typography';

interface TruncatedTextProps {
    text: string | number;
    variant?: string;
    style?: React.CSSProperties;
}

export function TruncatedText({ text, variant, style }: TruncatedTextProps) {
    const textRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            const element = textRef.current as HTMLDivElement | null;

            if (element) {
                setIsTruncated(element.scrollWidth > element.clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => window.removeEventListener('resize', checkOverflow);
    }, [text]);

    return (
        <Tooltip title={text} placement="top" disableHoverListener={!isTruncated}>
            <Typography
                ref={textRef}
                customVariant={variant}
                sx={{
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    ...style,
                }}
            >
                {text}
            </Typography>
        </Tooltip>
    );
}
