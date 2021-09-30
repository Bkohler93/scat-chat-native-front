import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import camFilled from "../assets/cam-filled.png";
import bottomBox from "../assets/bottom-box.png";
import { COLORS } from "../utilities/colors";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.topCtr}>
        <View style={styles.verifyCtr}>
          <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
            <Image
              source={camFilled}
              style={{ width: 175, height: 175 }}
            ></Image>
          </TouchableOpacity>
          <View style={styles.verifyTextCtr}>
            <Text style={styles.verifyText}>VERIFY LOCATION</Text>
          </View>
        </View>
        <Text style={styles.heading}>SCATCHAT</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.botCtr}>
        <Image style={styles.bottomBox} source={bottomBox}></Image>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topCtr: {
    flex: 5,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  verifyCtr: {
    position: "relative",
    alignSelf: "stretch",
    alignItems: "center",
  },
  verifyTextCtr: {
    position: "absolute",
    justifyContent: "center",
    bottom: 32,
  },
  verifyText: {
    fontSize: 9,
    fontFamily: "SourceCodePro",
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 45,
    paddingTop: 45,
    fontFamily: "RobotoBold",
    color: COLORS.darkBlue,
  },
  botCtr: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomBox: {
    width: 375,
    marginBottom: 20,
  },
});
