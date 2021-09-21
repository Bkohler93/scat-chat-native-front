import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import camFilled from "../assets/cam-filled.png";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Pressable>
        <Image source={camFilled} style={{ width: 175, height: 175 }}></Image>
      </Pressable>
      <Text>Hello there</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
