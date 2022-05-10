import { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

import 'react-native-gesture-handler';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import Widget from "./src/components/Widget";
import { theme } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    async function lockInSplashScreen() {
      if (!fontsLoaded) {
        await SplashScreen.preventAutoHideAsync();
        return;
      }

      await SplashScreen.hideAsync();
    }

    lockInSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Widget />
    </View>
  );
}
