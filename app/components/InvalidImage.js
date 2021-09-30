import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function InvalidImage() {
  let animation = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    animation.current.play();
    setTimeout(() => {
      navigation.navigate("Welcome");
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
          source={require("../assets/lottie_files/error-animation.json")}
        />
      </View>
      <View style={styles.messageBlockCtr}>
        <View style={styles.textCtr}>
          <Text style={styles.text}>Sorry, we could not find a toilet...</Text>
        </View>
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
    top: "25%",
    fontFamily: "RobotoThin",
    fontSize: 30,
    textAlign: "center",
    maxWidth: "80%",
  },
});
