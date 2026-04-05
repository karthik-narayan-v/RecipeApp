import { View, ViewStyle } from "react-native";
import AppText from "../../../../components/AppText";
import styles from "./styles";

interface ChipProps {
  label: string;
  backgroundColor: string;
  textColor: string;
}

const Chip = ({ label, backgroundColor, textColor }: ChipProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <AppText
        variant="label"
        weight="semiBold"
        letterSpacing={0.5}
        color={textColor}
      >
        {label}
      </AppText>
    </View>
  );
};

export default Chip;
