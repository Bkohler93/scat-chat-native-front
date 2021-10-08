import React, { useState } from "react";
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
  Keyboard,
} from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { registration } from "../../API/firebase";

const dimensions = Dimensions.get("window");
const inputHeight = Math.round((dimensions.height * 1) / 20);
const inputWidth = Math.round((dimensions.width * 4) / 5);
const smallCtrHeight = Math.round(dimensions.height * (3 / 4));
const topMargin = Math.round((dimensions.height * 1) / 6);

export default function RegisterScreen() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [inputError, setInputError] = useState(null);

  const navigation = useNavigation();

  const inputsValid = () => {
    setInputError(null);
    const emailRegex = new RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]");
    if (!emailRegex.test(email)) {
      setInputError("invalidEmail");
      return false;
    }

    if (password !== passwordMatch) {
      console.log(password, passwordMatch);
      setInputError("passwordsNotMatching");
      return false;
    }

    if (password.length < 6) {
      setInputError("passwordTooShort");
      return false;
    }
    console.log("passed");
    return true;
  };

  const changeConfirmPassword = (text) => {
    setPasswordMatch(text);

    if (text === "") {
      setInputError(null);
    }
  };

  const changeEmail = (text) => {
    setEmail(text);

    if (text === "") {
      setInputError(null);
    }
  };

  const changePassword = (text) => {
    setPassword(text);

    if (text === "") {
      setInputError(null);
    }
  };

  async function registerClick() {
    if (inputsValid()) {
      try {
        registration(email, password);
      } catch (err) {
        console.log("Error registering user");
        console.log(err);
        setInputError("emailTaken");
      }
    }
  }

  return (
    <SafeAreaView style={styles.outterCtr}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.ctr}
        keyboardVerticalOffset={-50}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1, backgroundColor: "blue" }}
        >
          <View style={styles.smallCtr}>
            <Text>Create your free account!</Text>
            <TextInput
              style={styles.input}
              placeholder={"Email"}
              placeholderTextColor={"black"}
              onChangeText={changeEmail}
            ></TextInput>
            {inputError === "emailTaken" && (
              <View style={styles.errorCtr}>
                <Text style={styles.errorText}>Email already in use.</Text>
              </View>
            )}
            {inputError === "invalidEmail" && (
              <View style={styles.errorCtr}>
                <Text style={styles.errorText}>Invalid email format.</Text>
              </View>
            )}
            <View style={styles.inputCtr}>
              <TextInput
                style={styles.input}
                placeholder={"Password"}
                placeholderTextColor={"black"}
                onChangeText={changePassword}
                secureTextEntry={hidePassword ? true : false}
              ></TextInput>

              <View style={styles.iconCtr}>
                {hidePassword === false && (
                  <FontAwesome
                    name="eye"
                    // backgroundColor="lightgrey"
                    color="black"
                    size={20}
                    onPress={() => setHidePassword(true)}
                  />
                )}
                {hidePassword === true && (
                  <FontAwesome
                    name="eye-slash"
                    // backgroundColor="lightgrey"
                    color="black"
                    size={20}
                    onPress={() => setHidePassword(false)}
                  />
                )}
              </View>
            </View>
            {inputError === "passwordTooShort" && (
              <View style={styles.errorCtr}>
                <Text style={styles.errorText}>
                  Passwords must contain more than six characters.
                </Text>
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder={"Confirm Password"}
              placeholderTextColor={"black"}
              onChangeText={changeConfirmPassword}
              secureTextEntry={hidePassword ? true : false}
            ></TextInput>
            {inputError === "passwordsNotMatching" && (
              <View style={styles.errorCtr}>
                <Text style={styles.errorText}>Passwords do not match.</Text>
              </View>
            )}

            <Button text={"Submit"} handleClick={registerClick} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outterCtr: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  ctr: {
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
  },
  errorCtr: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderLeftWidth: 1,
    borderColor: "red",
    width: inputWidth,
    padding: 2,
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    paddingLeft: 5,
    fontSize: 11,
  },
  iconCtr: {
    position: "absolute",
    right: 10,
    top: inputHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
