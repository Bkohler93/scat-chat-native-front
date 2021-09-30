import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import toiletOutlineTwo from "../assets/toilet-underlined.png";

import { COLORS } from "../utilities/colors";

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 5) / 6);
const imageWidth = dimensions.width;

const loadingHeight = Math.round((dimensions.width * 3) / 13);
const loadingWidth = dimensions.width;
const loadingCtrTop = Math.round(dimensions.height * (1 / 7));

export default function Loading({ message }) {
  let animation = useRef();

  useEffect(() => {
    animation.current.play();
  }, []);
  return (
    <View style={styles.ctr}>
      <View style={styles.spinnerCtr}>
        <View style={styles.lottieCtr}>
          <LottieView
            ref={animation}
            loop={true}
            style={styles.loading}
            speed={1}
            source={require("../assets/lottie_files/pending-spinner.json")}
          />
        </View>
        <View style={styles.outlineToiletCtr}>
          <Image source={toiletOutlineTwo} style={styles.toiletOutline}></Image>
        </View>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ctr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  spinnerCtr: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  lottieCtr: {
    position: "absolute",
    right: 0,
    top: loadingCtrTop,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    height: loadingHeight,
    width: loadingWidth,
  },
  outlineToiletCtr: {
    color: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  toiletOutline: {
    resizeMode: "contain",
    height: imageHeight,
    width: imageWidth,
  },
  message: {
    fontSize: 25,
    fontFamily: "Roboto",
    // position: "absolute",
    color: COLORS.darkBlue,
    bottom: "15%",
  },
});
