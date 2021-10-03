import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  Text,
} from "react-native";
import Button from "../components/Button";
import Firebase from '../../config/firebase';
import { useNavigation } from "@react-navigation/native";

const dimensions = Dimensions.get("window");
const inputHeight = Math.round((dimensions.height * 1) / 20);
const inputWidth = Math.round((dimensions.width * 4) / 5);
const smallCtrHeight = Math.round(dimensions.height * (3 / 4));

const auth = Firebase.auth();

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState('');


  async function loginClick() {
    console.log(auth);
    try  {
      if (email !== '' && password !== '') {
        auth.signInWithEmailAndPassword("brettkohler93@gmail.com", "hello1234");
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
    <SafeAreaView style={styles.ctr}>
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
              Create one here
            </Text>
          </View>
        </View>
        {loginError !== '' && (
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ctr: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: inputHeight,
    backgroundColor: "lightgrey",
    width: inputWidth,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    padding: 12,
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
