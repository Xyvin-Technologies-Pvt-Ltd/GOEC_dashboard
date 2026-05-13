// Single source of truth for design primitives.
// Consumed by both the Tailwind v4 @theme block (src/index.css) and the
// MUI theme (src/theme/index.jsx). When you add a new color/spacing/layout
// value, add it here first and reference it from both consumers.

export const tokens = {
  layout: {
    sidebarWidth: 260,
    navbarHeight: 64,
    contentMaxWidth: 1440,
    touchTargetMin: 44,
  },
  radius: {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
  },
  // 4px-based scale. Matches Tailwind's default progression.
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
  },
  // MUI-aligned breakpoints (kept in sync with Tailwind @theme overrides).
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 1000,
    lg: 1200,
    xl: 1920,
  },
  colors: {
    // Surfaces
    bg: "#27292f",
    surface: "#1c1d22",
    surfaceDeep: "#121212",
    surfaceAlt: "#39383d",
    surfaceMuted: "#242424",
    surfaceCard: "#2B2930",
    // Brand
    primary: "#5f5dd7",
    primaryLight: "#828DF8",
    primaryDark: "#3832A0",
    accent: "#4a4458",
    // Status
    danger: "#d14343",
    dangerLight: "#DA6868",
    dangerDark: "#922E2E",
    success: "#27AE60",
    successLight: "#43C6B7",
    successDark: "#0E8074",
    info: "#2196F3",
    infoLight: "#64B6F7",
    infoDark: "#0B79D0",
    warning: "#FFB020",
    warningLight: "#FFBF4C",
    warningDark: "#B27B16",
    link: "#2D9CDB",
    cmsRed: "#EB5757",
    cpGreen: "#219653",
    // Text
    text: "#f7f8fc",
    textMuted: "#b5b8c5",
    textDim: "#828282",
    textGrey: "#bdbdbd",
    // Borders
    border: "rgba(255, 255, 255, 0.2)",
    borderSubtle: "#333",
    borderDivider: "#E6E8F0",
    // Legacy MUI palette values (kept for sx={{ color: 'primary.main' }} parity)
    primaryMain: "#27292F",
    primaryDimText: "#828282",
    primaryGrey: "#212326",
    primaryButton: "#000",
    primarySaveButton: "#0047C2",
    secondaryMain: "#1C1D22",
    secondaryContrastText: "#B5B8C5",
    secondaryGreyText: "#bdbdbd",
    secondaryButton: "#4A4458",
    secondaryContrast: "#171717",
    secondaryLightGray: "#39383D",
    secondaryCardBg: "#2B2930",
    disabledColor: "#97999c",
    neutral100: "#F3F4F6",
    neutral200: "#E5E7EB",
    neutral300: "#D1D5DB",
    neutral400: "#9CA3AF",
    neutral500: "#6B7280",
    neutral600: "#4B5563",
    neutral700: "#374151",
    neutral800: "#1F2937",
    neutral900: "#111827",
  },
  font: {
    family: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
};
