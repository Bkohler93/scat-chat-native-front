import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Button,
  RecyclerViewBackedScrollViewBase,
} from "react-native";
import { Camera } from "expo-camera";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

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
            console.log("PASSED THE TEST BABY");
          } else {
            console.log("NO TOILET FOUND");
          }
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        ></Camera>
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button title="Take Picture" onPress={takePicture}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
