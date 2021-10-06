import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { userProfileContext } from "../utilities/userContext";

export default function ScatChatScreen() {
  const { userProfile } = useContext(userProfileContext);

  console.log("welcome in!");
  console.log(userProfile);
  return (
    <SafeAreaView style={styles.ctr}>
      <Text>Hello world</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ctr: {
    backgroundColor: "lightblue",
  },
});
