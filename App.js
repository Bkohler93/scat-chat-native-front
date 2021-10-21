import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import AppLoading from "expo-app-loading";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import CameraScreen from "./app/screens/CameraScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ScatchatScreen from "./app/screens/ScatchatScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as firebase from "firebase";
import apiKeys from "./config/keys";

import * as Font from "expo-font";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("./app/assets/fonts/Roboto-Black.ttf"),
      RobotoThin: require("./app/assets/fonts/Roboto-Thin.ttf"),
      RobotoBold: require("./app/assets/fonts/Roboto-Bold.ttf"),
      RobotoLight: require("./app/assets/fonts/Roboto-Light.ttf"),
      SourceCodePro: require("./app/assets/fonts/SourceCodePro-Black.ttf"),
      JustAnotherHand: require("./app/assets/fonts/Just_Another_Hand/JustAnotherHand-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
    console.log("loaded fonts");
    if (!firebase.apps.length) {
      console.log("Connected with Firebase");
      firebase.initializeApp(apiKeys.firebaseConfig);
    } else {
      console.log("Already connected to firebase");
      firebase.app();
    }
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerTitle: "Register",
            headerShown: true,
            headerBackTitleVisible: true,
          }}
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
          name="ScatchatScreen"
          component={ScatchatScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
