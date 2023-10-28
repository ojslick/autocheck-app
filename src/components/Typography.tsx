import { styled } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';

type TypographyVariant = {
    fontStyle: 'normal' | 'italic';
    fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    fontSize: number;
    lineHeight: string;
    letterSpacing?: number;
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
};

type TypographyVariants = {
    [key: string]: TypographyVariant;
};

const TYPOGRAPHY_VARIANTS: TypographyVariants = {
    headline: {
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '32px',
    },
    smallHeadline: {
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 18,
        lineHeight: '24px',
        letterSpacing: 0.15,
    },
    label: {
        textTransform: 'uppercase',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 11,
        lineHeight: '16px',
        letterSpacing: 0.5,
    },
    labelSmall: {
        textTransform: 'uppercase',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: 11,
        lineHeight: '16px',
        letterSpacing: 0.5,
    },
    labelXSmall: {
        textTransform: 'uppercase',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 9,
        lineHeight: '16px',
        letterSpacing: 0.8,
    },
    titleMedium: {
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0.1,
    },
    titleSmall: {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0.1,
    },
    titleXSmall: {
        fontStyle: 'normal',
        fontWeight: 200,
        fontSize: 9,
        lineHeight: '11px',
        letterSpacing: 0.1,
    },
    bodyLarge: {
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 16,
        lineHeight: '24px',
    },
    body: {
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0.25,
    },
    bodyBase: {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0.25,
    },
    bodyBaseBold: {
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0.25,
    },
    bodySmall: {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: 0.1,
    },
    bodySmallBold: {
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: 0.1,
    },
    bodyXSmall: {
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 10,
        lineHeight: '12px',
        letterSpacing: 0.1,
    },
};

type TypographyProps = {
    customVariant?: keyof typeof TYPOGRAPHY_VARIANTS;
};

export const Typography = styled(MuiTypography, {
    shouldForwardProp: (prop) => prop !== 'customVariant',
})<TypographyProps>(({ theme, customVariant = 'body' }) => ({
    fontFamily: theme.typography.fontFamily,
    ...TYPOGRAPHY_VARIANTS[customVariant],
}));
