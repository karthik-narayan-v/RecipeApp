import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../AppText";
import AppIcon from "../AppIcon";
import { theme } from "../../theme";

type AppHeaderProps = {
  onBackPress?: () => void;
  onSavedPress?: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({ onBackPress, onSavedPress }) => {
  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.left}>
          {onBackPress ? (
            <TouchableOpacity onPress={onBackPress}>
              <AppIcon name="ChevronLeft" size={24} color={theme.colors.black}/>
            </TouchableOpacity>
          ) : (
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <AppText
                variant="headline"
                size="md"
                weight="extraBold"
                letterSpacing={-0.5}
                color={theme.colors.black}
              >
                Cookora
              </AppText>
            </View>
          )}
        </View>

        {onBackPress && (
          <View style={styles.center}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="cover"
              />
              <AppText
                variant="headline"
                size="md"
                weight="extraBold"
                letterSpacing={-0.5}
                color={theme.colors.black}
              >
                Cookora
              </AppText>
            </View>
          </View>
        )}

        <View style={styles.right}>
          <TouchableOpacity onPress={onSavedPress}>
            <AppIcon name="Bookmark" color={theme.colors.black} fill size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
