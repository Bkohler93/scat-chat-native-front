import React, { useState, useContext } from "react";
import { userProfileContext } from "../../App";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Touchable,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import Button from "../components/Button";
import Firebase from "../../config/firebase";
import { useNavigation } from "@react-navigation/core";
import { ScatchatScreen } from "./ScatchatScreen";

const dimensions = Dimensions.get("window");
const inputHeight = Math.round((dimensions.height * 1) / 20);
const inputWidth = Math.round((dimensions.width * 4) / 5);
const smallCtrHeight = Math.round(dimensions.height * (3 / 4));
const topMargin = Math.round((dimensions.height * 1) / 6);
const auth = Firebase.auth();

export default function RegisterScreen() {
  const [email, setEmail] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordsMatch, setPasswordMatch] = useState(false);
  const { userProfile, setUserProfile } = useContext(userProfileContext);

  const navigation = useNavigation();

  async function registerClick() {
    try {
      if (email !== "" && password !== "" && password === confirmPassword) {
        console.log("submitting user data");
        const userRegister = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        if (userRegister) {
          setUserProfile(userRegister);
          navigation.navigate("ScatchatScreen");
        }
      }
    } catch (err) {
      console.log("Error registering user");
      console.log(err);
    }
  }

  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.ctr}
      >
        <View style={styles.smallCtr}>
          <Text>Create your free account!</Text>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            placeholderTextColor={"black"}
            onChangeText={setEmail}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            placeholderTextColor={"black"}
            onChangeText={setPassword}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder={"Confirm Password"}
            placeholderTextColor={"black"}
            onChangeText={setConfirmPassword}
          ></TextInput>
          <Button text={"Submit"} handleClick={registerClick} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ctr: {
    // justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    marginTop: topMargin,
  },
  input: {
    height: inputHeight,
    includeFontPadding: false,
    backgroundColor: "lightgrey",
    width: inputWidth,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 10,
    fontFamily: "RobotoLight",
    color: "black",
    fontSize: 16,
  },
  registerCtr: {
    justifyContent: "center",
    alignItems: "center",
  },
  registerTxt: {
    fontFamily: "RobotoLight",
  },
  registerLink: {
    fontFamily: "RobotoLight",
    textDecorationLine: "underline",
    marginTop: 3,
  },
  buttonFlexEnd: {
    alignSelf: "flex-end",
  },
  smallCtr: {
    height: smallCtrHeight,
    // justifyContent: "space-around",
    alignItems: "center",
  },
});
