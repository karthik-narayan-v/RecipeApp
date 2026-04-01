import React, { useEffect, useState } from "react";
import * as ExpoSplash from "expo-splash-screen";
import { Provider } from "react-redux";
import SplashScreen from "./features/splash/screens/SplashScreen";
import { FontProvider } from "./providers/FontProvider";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";

ExpoSplash.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
        await ExpoSplash.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isAppReady) return null;

  if (showCustomSplash) {
    return (
      <SplashScreen onAnimationFinish={() => setShowCustomSplash(false)} />
    );
  }

  return (
    <FontProvider>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </FontProvider>
  );
}
