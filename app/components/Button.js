import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

const dimensions = Dimensions.get("window");
const buttonHeight = Math.round((dimensions.height * 1) / 15);
const buttonWidth = Math.round((dimensions.width * 4) / 5);

export default function Button({ text, handleClick }) {
  return (
    <TouchableOpacity style={styles.touchButton} onPress={handleClick}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchButton: {
    height: buttonHeight,
    width: buttonWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 21,
    fontFamily: "RobotoBold",
  },
});
