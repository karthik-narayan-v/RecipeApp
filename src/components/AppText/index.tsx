import React from "react";
import { Text } from "react-native";
import { fontSizes, fontWeights, getFontFamily } from "../../theme/typography";
import { AppTextProps } from "./types";

const AppText: React.FC<AppTextProps> = ({
  variant = "body",
  size = "md",
  weight = "regular",
  letterSpacing = 0,
  color,
  children,
}) => {
  const variantFontSizes = fontSizes[variant as keyof typeof fontSizes];
  const fontSize = variantFontSizes
    ? variantFontSizes[size as keyof typeof variantFontSizes]
    : 14;
  const fontWeightValue = fontWeights[weight as keyof typeof fontWeights];
  const fontFamily = getFontFamily(variant, fontWeightValue);

  return (
    <Text
      style={{
        fontSize,
        fontFamily,
        color,
        letterSpacing,
        lineHeight: Math.round(fontSize * 1.2),
      }}
    >
      {children}
    </Text>
  );
};

export default AppText;
