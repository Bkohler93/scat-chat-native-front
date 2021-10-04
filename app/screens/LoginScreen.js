import React, { useState, useContext } from "react";
import { userProfileContext } from "../../App";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../components/Button";
import Firebase from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { ScatchatScreen } from "./ScatchatScreen";

const dimensions = Dimensions.get("window");
const inputHeight = Math.round((dimensions.height * 1) / 20);
const inputWidth = Math.round((dimensions.width * 4) / 5);
const smallCtrHeight = Math.round(dimensions.height * (3 / 4));
const topMargin = Math.round((dimensions.height * 1) / 6);

const auth = Firebase.auth();

export default function LoginScreen() {
  const { userProfile, setUserProfile } = useContext(userProfileContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState("");

  async function loginClick() {
    try {
      if (email !== "" && password !== "") {
        console.log(email, password);
        const userAuth = await auth.signInWithEmailAndPassword(email, password);

        if (userAuth) {
          setUserProfile(userAuth);
          navigation.navigate("ScatchatScreen");
        }
      }
    } catch (err) {
      console.log("Error with login");
      setLoginError(err.message);
    }
  }

  function jumpInClick() {
    console.log("heading into snapchat as anonymous");
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.ctr}
      >
        <View style={styles.smallCtr}>
          <View style={styles.inputCtr}>
            <TextInput
              style={styles.input}
              placeholder={"Email"}
              placeholderTextColor={"black"}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={"Password"}
              secureTextEntry={true}
              placeholderTextColor={"black"}
              onChangeText={setPassword}
            />
            {/* <View style={styles.ctr}></View> */}
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
          </View>
          {loginError !== "" && (
            <View>
              <Text>Error logging in</Text>
            </View>
          )}
          <Button
            style={styles.buttonFlexEnd}
            text={"Browse Scatchats"}
            handleClick={jumpInClick}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ctr: {
    justifyContent: "space-around",
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
    justifyContent: "space-around",
    alignItems: "center",
  },
});
