import React from "react";
import * as Icons from "lucide-react-native";
import { theme } from "../../theme";

type IconName = keyof typeof Icons;

type AppIconProps = {
  name: IconName;
  size?: number;
  color?: string;
  fill?: boolean;
  strokeWidth?: number;
};

const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  color = theme.colors.primary,
  fill = false,
  strokeWidth = 2,
}) => {
  const IconComponent = Icons[name] as React.ComponentType<Icons.LucideProps>;

  if (!IconComponent) return null;

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      fill={fill ? color : "none"}
    />
  );
};

export default AppIcon;