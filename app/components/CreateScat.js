import React, { useState } from "react";
import {
  Text,
  Dimensions,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as firebase from "firebase";
import { submitScat } from "../../API/firebase";

const dimensions = Dimensions.get("window");
const inputHeight = Math.round(dimensions.height / 2);
const inputWidth = Math.round((dimensions.width * 4) / 5);
const authorWidth = Math.round(dimensions.width / 3);

export default function CreateScat({ setStatus }) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");
  const navigation = useNavigation();

  const submitNewScat = () => {
    const scatData = {
      message_id: uuidv4(),
      time_posted: firebase.firestore.Timestamp.fromDate(new Date()),
      upvotes: 0,
      user_id: firebase.auth().currentUser.uid,
      color: color,
      display_name: author,
      text: text,
    };

    submitScat(scatData);
  };

  return (
    <SafeAreaView style={styles.ctr}>
      <View style={styles.textCtr}>
        <TextInput
          style={[styles.input, styles.scatInput]}
          placeholder={"Type Scat Here"}
          placeholderTextColor={"black"}
          onChangeText={setText}
          autoCapitalize="none"
          multiline={true}
        />
        <TextInput
          style={[styles.input, styles.authorInput]}
          placeholder={"Display Name Here"}
          placeholderTextColor={"black"}
          onChangeText={setAuthor}
          autoCapitalize="none"
        />
      </View>
      <Button title="SubmitScat" onPress={submitNewScat} />
      <Text>Hello World</Text>
      <Button title="Back" onPress={() => setStatus("viewScats")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ctr: {
    alignItems: "center",
    marginTop: 40,
    flex: 1,
  },
  textCtr: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: inputHeight,
  },
  input: {
    includeFontPadding: false,
    backgroundColor: "#ffffff",
    width: inputWidth,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: "JustAnotherHand",
    color: "black",
    fontSize: 40,
  },
  authorInput: {
    width: authorWidth,
    alignSelf: "flex-end",
    paddingRight: 20,
    paddingBottom: 20,
    fontSize: 25,
    flexShrink: 1,
  },
  scatInput: {
    flex: 1,
  },
});
