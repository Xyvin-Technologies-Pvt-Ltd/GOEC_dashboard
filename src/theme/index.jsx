import { createTheme } from '@mui/material';
import { tokens } from './tokens';

const { colors: c, space: s, radius: r, breakpoints: bp, font } = tokens;

export const theme = createTheme({
  breakpoints: {
    values: { xs: bp.xs, sm: bp.sm, md: bp.md, lg: bp.lg, xl: bp.xl },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        sizeSmall: { padding: `${s[2] - 2}px ${s[4]}px` },     // 6px 16px
        sizeMedium: { padding: `${s[2]}px ${s[5]}px` },         // 8px 20px
        sizeLarge: { padding: `${s[3] - 1}px ${s[6]}px` },      // 11px 24px
        textSizeSmall: { padding: `${s[2] - 1}px ${s[3]}px` },  // 7px 12px
        textSizeMedium: { padding: `${s[3] - 3}px ${s[4]}px` }, // 9px 16px
        textSizeLarge: { padding: `${s[3]}px ${s[4]}px` },      // 12px 16px
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: `${s[8]}px ${s[6]}px`,
          '&:last-child': { paddingBottom: `${s[8]}px` },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: { padding: `${s[8]}px ${s[6]}px` },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: c.borderDivider },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: c.neutral100,
          '.MuiTableCell-root': { color: c.neutral700 },
          borderBottom: 'none',
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: s[1],
            paddingBottom: s[1],
          },
        },
      },
    },
  },
  palette: {
    neutral: {
      100: c.neutral100,
      200: c.neutral200,
      300: c.neutral300,
      400: c.neutral400,
      500: c.neutral500,
      600: c.neutral600,
      700: c.neutral700,
      800: c.neutral800,
      900: c.neutral900,
    },
    action: {
      active: c.neutral500,
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background: {
      default: '#F9FAFC',
      paper: '#FFFFFF',
    },
    divider: c.borderDivider,
    primary: {
      main: c.primaryMain,
      light: c.primaryLight,
      dark: c.primaryDark,
      contrastText: c.text,
      DimText: c.primaryDimText,
      grey: c.primaryGrey,
      button: c.primaryButton,
      subButton: 'rgba(181, 184, 197,0.2)',
      saveButton: c.primarySaveButton,
    },
    secondary: {
      main: c.secondaryMain,
      light: c.successLight,
      dark: c.successDark,
      contrastText: c.secondaryContrastText,
      greytext: c.secondaryGreyText,
      button: c.secondaryButton,
      contrast: c.secondaryContrast,
      lightGray: c.secondaryLightGray,
      cardbg: c.secondaryCardBg,
    },
    success: {
      main: c.success,
      light: c.successLight,
      dark: c.successDark,
      contrastText: '#FFFFFF',
    },
    info: {
      main: c.info,
      light: c.infoLight,
      dark: c.infoDark,
      contrastText: '#FFFFFF',
    },
    warning: {
      main: c.warning,
      light: c.warningLight,
      dark: c.warningDark,
      contrastText: '#FFFFFF',
    },
    error: {
      main: c.danger,
      light: c.dangerLight,
      dark: c.dangerDark,
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#121828',
      secondary: '#65748B',
      disabled: 'rgba(55, 65, 81, 0.48)',
    },
    disabledColor: {
      main: c.disabledColor,
      light: c.disabledColor,
      dark: c.disabledColor,
      contrastText: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: r.lg,
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
  ],
  typography: {
    button: { fontWeight: 600 },
    fontFamily: font.family,
    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.57 },
    subtitle1: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.75 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.57 },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.66 },
    h1: { fontWeight: 700, fontSize: '3.5rem', lineHeight: 1.375 },
    h2: { fontWeight: 700, fontSize: '3rem', lineHeight: 1.375 },
    h3: { fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.375 },
    h4: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.375 },
    h5: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.375 },
    h6: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.375 },
  },
});
