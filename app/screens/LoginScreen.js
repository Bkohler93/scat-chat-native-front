import React, { useState, useContext } from "react";
import { userProfileContext } from "../utilities/userContext";
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
  ScrollView,
} from "react-native";
import Button from "../components/Button";
import Firebase from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native/Libraries/NewAppScreen";

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
    if (email !== "" && password !== "") {
      try {
        console.log(email, password);
        const userAuth = await auth.signInWithEmailAndPassword(email, password);

        if (userAuth) {
          setUserProfile(userAuth);
          navigation.navigate("ScatchatScreen");
        }
      } catch (err) {
        console.log("Error with login");
        setLoginError("invalidLogin");
      }
    }
  }

  function changeEmail(text) {
    setEmail(text);

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
    console.log("heading into snapchat as anonymous");
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
            <View style={styles.lineBreakCtr}>
              <View style={styles.lineBreak}></View>

              <Text style={styles.lineBreakText}>OR</Text>
              <View style={styles.lineBreak}></View>
            </View>
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
    width: inputWidth / 3,
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
