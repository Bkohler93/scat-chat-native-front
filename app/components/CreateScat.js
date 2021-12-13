import React, { useState, useEffect } from "react";
import {
  Text,
  Dimensions,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as firebase from "firebase";
import { submitScat } from "../../API/firebase";
import MarkerSelect from "../components/MarkerSelect";
import SubmitPopUp from "../components/SubmitPopUp";
import { COLORS, Colors } from "../utilities/colors";

const dimensions = Dimensions.get("window");
const inputHeight = Math.round(dimensions.height * (4 / 9));
const inputWidth = Math.round((dimensions.width * 4) / 5);
const authorWidth = Math.round(dimensions.width / 3);
const ctrHeight = Math.round(dimensions.height * (6 / 7));

export default function CreateScat({ setStatus }) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    console.log(dimensions.height);
  }, []);

  const submitNewScat = async () => {
    const scatData = {
      message_id: uuidv4(),
      time_posted: firebase.firestore.Timestamp.fromDate(new Date()),
      upvotes: 0,
      user_id: firebase.auth().currentUser.uid,
      color: color,
      display_name: author,
      text: text,
    };

    setSubmitStatus("pending");

    //set waiting to submit
    await submitScat(scatData);

    //submission successful
    setSubmitStatus("success");
    console.log("submitted");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.ctr}>
        {submitStatus === "pending" && <SubmitPopUp status={"pending"} />}
        {submitStatus === "success" && <SubmitPopUp status={"success"} />}
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1,
            },
            styles.backBtn,
          ]}
          onPress={() => setStatus("viewScats")}
          hitSlop={20}
        >
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <View style={styles.textCtr}>
          <TextInput
            style={[styles.input, styles.scatInput, { color: COLORS[color] }]}
            placeholder={"Type Scat Here"}
            placeholderTextColor={"#7E7E8B"}
            onChangeText={setText}
            autoCapitalize="none"
            multiline={true}
            value={text}
          />
          <TextInput
            style={[styles.input, styles.authorInput]}
            placeholder={"Display Name Here"}
            placeholderTextColor={"#7E7E8B"}
            onChangeText={setAuthor}
            autoCapitalize="none"
          />
        </View>
        <MarkerSelect setColor={setColor} color={color} />
        <Pressable
          onPress={submitNewScat}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1,
            },

            styles.submitBtn,
          ]}
          hitSlop={20}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ctr: {
    alignItems: "center",
    justifyContent: "space-around",
    // flex: 1,
    height: ctrHeight,
  },
  backBtn: {
    backgroundColor: COLORS.darkBlue,
    padding: 12,
    paddingLeft: 17,
    paddingRight: 17,
    borderRadius: 10,
    position: "absolute",
    top: dimensions.height < 800 ? -25 : -8,
    right: 0,
    zIndex: 2,
  },
  backText: {
    color: "white",
    fontFamily: "RobotoBold",
    fontSize: 15,
  },
  textCtr: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: inputHeight,
  },
  input: {
    padding: 30,
    letterSpacing: 1,
    includeFontPadding: false,
    backgroundColor: "#ffffff",
    width: inputWidth,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: "JustAnotherHand",
    fontSize: 40,
  },
  authorInput: {
    paddingRight: 20,
    textAlign: "right",
    paddingLeft: 25,
    paddingBottom: 20,
    fontSize: 25,
    flexShrink: 1,
  },
  scatInput: {
    flex: 1,
    textAlignVertical: "top",
    paddingLeft: 20,
    paddingRight: 20,
  },
  submitBtn: {
    backgroundColor: COLORS.darkBlue,
    padding: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 15,
  },
  submitText: {
    color: "white",
    fontFamily: "RobotoBold",
    fontSize: 20,
  },
});
