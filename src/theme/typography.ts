export const fontFamilies = {
  primary: 'PlusJakartaSans',
  secondary: 'Manrope',
};

export const fontWeights = {
  regular: '400Regular',
  semiBold: '600SemiBold',
  bold: '700Bold',
  extraBold: '800ExtraBold',
};

export const fontSizes = {
  headline: {
    sm: 18,
    md: 22,
    lg: 28,
    xl: 32,
  },
  body: {
    sm: 12,
    md: 14,
    lg: 16,
  },
  label: {
    sm: 10,
    md: 12,
    lg: 14,
  },
};

export const getFontFamily = (variant: string, weight: string): string => {
  if (variant === 'body') {
    return `Manrope_${weight}`;
  }
  return `PlusJakartaSans_${weight}`;
};