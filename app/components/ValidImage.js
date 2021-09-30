import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function ValidImage() {
  const navigation = useNavigation();
  let animation = useRef();
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() => {
    animation.current.play();
    setTimeout(() => {
      setDisplayMessage(true);
    }, 1000);

    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 3000);
  }, []);

  return (
    <View style={styles.ctr}>
      <View style={styles.lottieCtr}>
        <LottieView
          ref={animation}
          loop={false}
          style={styles.loading}
          speed={1}
          source={require("../assets/lottie_files/valid-checkmark.json")}
        />
      </View>
      <View style={styles.messageBlockCtr}>
        {displayMessage && (
          <View style={styles.textCtr}>
            <Text style={styles.text}>Welcome in!</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ctr: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  lottieCtr: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loading: {
    height: 200,
  },
  messageBlockCtr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textCtr: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  text: {
    position: "absolute",
    top: "20%",
    fontFamily: "RobotoThin",
    fontSize: 35,
  },
});
