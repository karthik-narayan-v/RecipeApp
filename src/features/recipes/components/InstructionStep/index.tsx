import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../../../components/AppText";
import { theme } from "../../../../theme";
import styles from "./styles";

type InstructionStepProps = {
  index: number;
  instruction: string;
};

const InstructionStep = ({ index, instruction }: InstructionStepProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <TouchableOpacity
      style={styles.stepRow}
      onPress={() => setIsActive((prev) => !prev)}
      activeOpacity={1}
    >
      <AppText
        variant="headline"
        weight="extraBold"
        size="xl"
        color={isActive ? theme.colors.accent : theme.colors.surface}
      >
        {String(index + 1).padStart(2, "0")}
      </AppText>
      <View style={styles.instructionWrapper}>
        <AppText
          variant="body"
          weight="regular"
          size="lg"
          color={theme.colors.darkBrown}
        >
          {instruction}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default InstructionStep;
