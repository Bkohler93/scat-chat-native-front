import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { getEmails, getAllScats } from "../../API/firebase";
import { FontAwesome } from "@expo/vector-icons";
import * as firebase from "firebase";
import { icon } from "@fortawesome/fontawesome-svg-core";
const dimensions = Dimensions.get("window");
const iconOffY = Math.round(dimensions.height / 10);
const iconOffX = Math.round(dimensions.width / 6);
const iconCtrSize = Math.round(dimensions.width / 4);

export default function ScatChatScreen() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    getEmails().then((email) => {
      setEmail(email);
    });

    getAllScats().then((scats) => {
      console.log(scats);
    });
  }, []);

  return (
    <View style={styles.ctr}>
      <Text>Hello {email} </Text>

      <View style={styles.iconCtr}>
        <FontAwesome
          name="pencil"
          color="black"
          size={50}
          style={styles.icon}
          onPress={() => console.log("pressed")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ctr: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCtr: {
    position: "absolute",
    bottom: iconOffY,
    right: iconOffX,
    backgroundColor: "lightblue",
    borderRadius: 100,
    height: iconCtrSize,
    width: iconCtrSize,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    padding: 15,
    borderRadius: 100,
  },
});
