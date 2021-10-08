import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { getEmails } from "../../API/firebase";
import * as firebase from "firebase";

export default function ScatChatScreen() {
  const [email, setEmail] = useState(null);
  console.log("welcome in!");
  console.log("hello");

  useEffect(() => {
    getEmails().then((email) => {
      console.log("GOT IT");
      setEmail(email);
    });
  }, []);

  return (
    <SafeAreaView style={styles.ctr}>
      <Text>Hello {email} WE DID IT</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ctr: {
    backgroundColor: "lightblue",
  },
});
