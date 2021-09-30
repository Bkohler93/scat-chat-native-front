import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import ValidImage from "../components/ValidImage";
import InvalidImage from "../components/InvalidImage";
import Loading from "../components/PendingImage";

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 6) / 7);
const imageWidth = dimensions.width;
const imageTop = Math.round(dimensions.height * (3 / 10));
const imageLeft = imageWidth / 2;
const buttonHeight = Math.round(dimensions.height * (1 / 10));
const buttonWidth = buttonHeight;

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [validationStatus, setValidationStatus] = useState("waiting");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 0.7,
        base64: true,
      });
      var imageObj = { image: data.base64 };
      setValidationStatus("pending");

      fetch("https://powerful-dusk-99183.herokuapp.com/image-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageObj.image }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === "toilet") {
            setValidationStatus("valid");
          } else {
            console.log("NO TOILET FOUND");
            setValidationStatus("valid");
          }
        })
        .catch((err) => {
          setValidationStatus("valid");
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {validationStatus === "waiting" && (
        <View style={styles.camOutterCtr}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={"1:1"}
              zoom="0"
            ></Camera>
          </View>
          <View style={styles.takePicOutter}>
            <TouchableOpacity style={styles.takePicCtr} onPress={takePicture}>
              <View style={styles.takePicBtn}></View>
            </TouchableOpacity>
          </View>
          <View style={styles.toiletOutlineCtr}>
            <TouchableOpacity style={styles.toileOutline} onPress={takePicture}>
              <Image
                style={styles.toiletOutlineImage}
                source={require("../assets/toilet-underlined-trans.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {validationStatus === "pending" && (
        <Loading message={"Validating Toilet..."} />
      )}
      {validationStatus === "invalid" && <InvalidImage />}
      {validationStatus === "valid" && <ValidImage />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  takePicOutter: {
    height: "100%",
    width: "100%",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  camOutterCtr: {
    flex: 1,
    position: "relative",
    backgroundColor: "lightblue",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  takePicCtr: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  toiletOutlineCtr: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    top: 0,
    left: 0,
    alignItems: "center",
  },
  toiletOutLineImage: {
    height: imageHeight,
    width: imageWidth,
    position: "absolute",
    top: 0,
    left: 0,
  },
  takePicBtn: {
    position: "relative",
    height: buttonHeight,
    width: buttonWidth,
    marginBottom: 80,
    borderRadius: 100 / 2,
    borderWidth: 10,
    opacity: 0.8,
    borderLeftColor: "grey",
    borderRightColor: "grey",
    borderTopColor: "grey",
    borderBottomColor: "grey",
  },
  pendingCtr: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
