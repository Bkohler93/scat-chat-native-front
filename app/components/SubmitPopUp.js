import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const dimensions = Dimensions.get("window");
const popupWidth = Math.round(dimensions.width * (5 / 6));
const popupHeight = Math.round(dimensions.height * (2 / 7));
const popupOffsetY = Math.round(dimensions.height * (1 / 5));

export default function SubmitPopUp({ status }) {
  return (
    <View style={styles.backgroundModal}>
      <View style={styles.popupCtr}>
        <Text style={styles.popupText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundModal: {
    backgroundColor: "lightgrey",
    opacity: 0.8,
    position: "absolute",
    zIndex: 9,
    width: dimensions.width,
    height: dimensions.height,
    alignItems: "center",
  },
  popupCtr: {
    position: "absolute",
    height: popupHeight,
    width: popupWidth,
    backgroundColor: "grey",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    top: popupOffsetY,
  },
});
