import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from "react-native";

const dimensions = Dimensions.get("window");
const markerSelectWidth = Math.round(dimensions.width * (5 / 8));

export default function MarkerSelect({ setColor, color }) {
  useEffect(() => {
    setColor("markerBlack");
  }, []);

  return (
    <View style={styles.selectCtr}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },

          styles.submitBtn,
        ]}
        hitSlop={20}
        onPress={() => setColor("markerBlack")}
      >
        {color !== "markerBlack" && (
          <Image
            style={[styles.marker, styles.blackMarker]}
            source={require("../assets/marker_black_small.png")}
          />
        )}
        {color === "markerBlack" && (
          <Image
            style={[styles.marker, styles.blackMarker]}
            source={require("../assets/marker_black_large.png")}
          />
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },

          styles.submitBtn,
        ]}
        hitSlop={20}
        onPress={() => setColor("markerCyan")}
      >
        {color !== "markerCyan" && (
          <Image
            style={[styles.marker, styles.cyanMarker]}
            source={require("../assets/marker_cyan_small.png")}
          />
        )}
        {color === "markerCyan" && (
          <Image
            style={[styles.marker, styles.cyanMarker]}
            source={require("../assets/marker_cyan_large.png")}
          />
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },

          styles.submitBtn,
        ]}
        hitSlop={20}
        onPress={() => setColor("markerMagenta")}
      >
        {color !== "markerMagenta" && (
          <Image
            style={[styles.marker, styles.magentaMarker]}
            source={require("../assets/marker_magenta_small.png")}
          />
        )}
        {color === "markerMagenta" && (
          <Image
            style={[styles.marker, styles.magentaMarker]}
            source={require("../assets/marker_magenta_large.png")}
          />
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },

          styles.submitBtn,
        ]}
        hitSlop={20}
        onPress={() => setColor("markerOrange")}
      >
        {color !== "markerOrange" && (
          <Image
            style={[styles.marker, styles.orangeMarker]}
            source={require("../assets/marker_orange_small.png")}
          />
        )}
        {color === "markerOrange" && (
          <Image
            style={[styles.marker, styles.orangeMarker]}
            source={require("../assets/marker_orange_large.png")}
          />
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },

          styles.submitBtn,
        ]}
        hitSlop={20}
        onPress={() => setColor("markerTeal")}
      >
        {color !== "markerTeal" && (
          <Image
            style={[styles.marker, styles.tealMarker]}
            source={require("../assets/marker_teal_small.png")}
          />
        )}
        {color === "markerTeal" && (
          <Image
            style={[styles.marker, styles.tealMarker]}
            source={require("../assets/marker_teal_large.png")}
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectCtr: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: markerSelectWidth,
  },
});
