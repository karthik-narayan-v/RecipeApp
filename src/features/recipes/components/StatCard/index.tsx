import React from "react";
import { View } from "react-native";
import AppIcon from "../../../../components/AppIcon";
import { styles } from "./styles";
import { theme } from "../../../../theme";
import * as Icons from "lucide-react-native";
import AppText from "../../../../components/AppText";

interface StatCardProps {
  iconName: IconName;
  label: string;
  value: string;
}

type IconName = keyof typeof Icons;

const StatCard = ({ iconName, label, value }: StatCardProps) => (
  <View style={styles.card}>
    <AppIcon name={iconName} size={24} color={theme.colors.primary} />
    <AppText variant="body" size="md" color={theme.colors.darkBrown} letterSpacing={1.2}>
      {label}
    </AppText>
    <AppText variant="headline" weight="bold" size="md" color={theme.colors.black}>
      {value}
    </AppText>
  </View>
);

export default StatCard;