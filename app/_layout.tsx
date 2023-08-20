import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
import * as Localization from "expo-localization";

import { I18n } from "i18n-js";

import en from "../translations/en.json";
import pt from "../translations/pt.json";

import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { Provider } from "react-redux";
import createStore from "../state/redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Route } from "expo-router/build/Route";
import { LocalizationProvider } from "@/context/LocalizationProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

const store = createStore();

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export {
  useRouter,
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "onboarding",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout(props: any) {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <LocalizationProvider>
            <Stack>
              <Stack.Screen
                name="(1-onboarding)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(2-auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(3-negotiations)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(4-profile)"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="(5-general)"
                options={{ headerShown: false }}
              />
            </Stack>
          </LocalizationProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
