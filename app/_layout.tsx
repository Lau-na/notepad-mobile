import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { MD3LightTheme as PaperTheme, Provider as PaperProvider } from "react-native-paper";
import Login from "./login";
import { useState } from "react";
import AuthContext from "../contexts/auth";
import { Auth } from "../types/auth";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Layout() {
  const colorScheme = useColorScheme();
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <PaperProvider
          theme={{
            ...PaperTheme,
            colors: {
              ...PaperTheme.colors,
              primary: "#75d1ff",
              surfaceVariant: "#e8f4fa",
              // onPrimary: "red",
              // primaryContainer: "red",
              // onPrimaryContainer: "red",
              // secondary: "red",
              // onSecondary: "red",
              // secondaryContainer: "red",
              // onSecondaryContainer: "red",
              // tertiary: "red",
              // onTertiary: "red",
              // tertiaryContainer: "red",
              // onTertiaryContainer: "red",
              // error: "red",
              // onError: "red",
              // errorContainer: "red",
              // onErrorContainer: "red",
              // background: "red",
              // onBackground: "red",
              // surface: "red",
              // onSurface: "red",
              // onSurfaceVariant: "red",
              // outline: "red",
              // outlineVariant: "red",
              // shadow: "red",
              // scrim: "red",
              // inverseSurface: "red",
              // inverseOnSurface: "red",
              // inversePrimary: "red",
              // surfaceDisabled: "red",
              // onSurfaceDisabled: "red",
              // backdrop: "red",
            },
          }}
        >
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            {auth ? (
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="note" options={{ title: "Anotação" }} />
                <Stack.Screen name="category" options={{ title: "Categoria" }} />
              </Stack>
            ) : (
              <Login />
            )}
          </ThemeProvider>
        </PaperProvider>
      </AuthContext.Provider>
    </>
  );
}
