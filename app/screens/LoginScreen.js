import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../../API/firebase";

const dimensions = Dimensions.get("window");
const inputHeight = Math.round((dimensions.height * 1) / 20);
const inputWidth = Math.round((dimensions.width * 4) / 5);

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("jennyssbuggtt@gmail.com");
  const [password, setPassword] = useState("hello1234");
  const [loginError, setLoginError] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  async function loginClick() {
    if (email !== "" && password !== "") {
      try {
        await signIn(email, password);
        navigation.navigate("ScatchatScreen");
      } catch (err) {
        console.log("Error with login");
        console.log(err);
        setLoginError("invalidLogin");
      }
    }
  }

  function changeEmail(text) {
    setEmail(text.trim());

    if (text === "") {
      setLoginError(null);
    }
  }

  function changePassword(text) {
    setPassword(text);

    if (text === "") {
      setLoginError(null);
    }
  }
  function jumpInClick() {
    navigation.navigate("ScatchatScreen");
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="height"
        enabled={true}
        style={styles.avoidView}
      >
        <View style={styles.smallCtr}>
          <View style={styles.inputCtr}>
            <TextInput
              style={styles.input}
              placeholder={"Email"}
              placeholderTextColor={"black"}
              onChangeText={changeEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={"Password"}
              secureTextEntry={true}
              placeholderTextColor={"black"}
              onChangeText={changePassword}
            />
            {loginError === "invalidLogin" && (
              <View style={styles.errorCtr}>
                <Text style={styles.errorText}>
                  Login credentials are invalid.
                </Text>
              </View>
            )}
            <Button text={"Login"} handleClick={loginClick} />
            <View style={styles.registerCtr}>
              <Text style={styles.registerTxt}>
                You can't post without an account!
              </Text>
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                Create one here!
              </Text>
            </View>

            {keyboardStatus === "Keyboard Hidden" && (
              <View style={styles.lineBreakCtr}>
                <View style={styles.lineBreak}></View>

                <Text style={styles.lineBreakText}>OR</Text>
                <View style={styles.lineBreak}></View>
              </View>
            )}
          </View>
          {keyboardStatus === "Keyboard Hidden" && (
            <Button
              style={styles.buttonFlexEnd}
              text={"Browse Scatchats"}
              handleClick={jumpInClick}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ctr: {
    flex: 1,
  },
  avoidView: {
    flex: 1,
    justifyContent: "center",
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
    justifyContent: "space-around",
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
  lineBreakCtr: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  lineBreak: {
    borderBottomWidth: 1,
    borderColor: "#ADACAC",
    marginTop: 30,
    marginBottom: 30,
    width: (inputWidth * 2) / 5,
  },
  lineBreakText: {
    top: 20,
  },
  errorText: {
    color: "red",
    paddingLeft: 5,
    fontSize: 11,
  },
});
