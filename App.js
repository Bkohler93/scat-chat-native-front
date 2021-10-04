import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import AppLoading from "expo-app-loading";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import CameraScreen from "./app/screens/CameraScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ScatchatScreen from "./app/screens/ScatchatScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Font from "expo-font";
const Stack = createNativeStackNavigator();
export const userProfileContext = createContext({});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("./app/assets/fonts/Roboto-Black.ttf"),
      RobotoThin: require("./app/assets/fonts/Roboto-Thin.ttf"),
      RobotoBold: require("./app/assets/fonts/Roboto-Bold.ttf"),
      RobotoLight: require("./app/assets/fonts/Roboto-Light.ttf"),
      SourceCodePro: require("./app/assets/fonts/SourceCodePro-Black.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <userProfileContext.Provider value={{ userProfile, setUserProfile }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScatchatScreen"
            component={ScatchatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </userProfileContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
