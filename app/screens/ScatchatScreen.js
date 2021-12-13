import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { getEmails, getAllScats } from "../../API/firebase";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { COLORS } from "../utilities/colors";
import * as firebase from "firebase";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import CreateScat from "../components/CreateScat";
const dimensions = Dimensions.get("window");
const iconOffY = Math.round(dimensions.height / 12);
const iconOffX = Math.round(dimensions.width / 13);
const iconCtrSize = Math.round(dimensions.width / 5);
const scatWidth = Math.round(dimensions.width * (5 / 6));

export default function ScatChatScreen() {
  const [email, setEmail] = useState(null);
  const [scatList, setScatList] = useState([]);
  const [status, setStatus] = useState("viewScats");
  const navigation = useNavigation();

  useEffect(() => {
    setScatList([]);
    getAllScats().then((scats) => {
      scats.forEach((scat) => {
        setScatList((oldScats) => [...oldScats, scat.data()]);
      });
    });
    getEmails().then((email) => {
      setEmail(email);
    });
  }, [status]);

  const renderScat = (scat) => {
    let textColor = COLORS[scat.item.color];

    return (
      <View style={styles.scatCtr}>
        <Text style={[styles.Text, { color: textColor }]}>
          {scat.item.text}
        </Text>
        <Text style={styles.Author}>- {scat.item.display_name}</Text>
        <View style={styles.upvoteCtr}>
          <Text style={styles.upvoteText}>{scat.item.upvotes}</Text>
          <FontAwesome name="thumbs-o-up" size={20} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.ctr}>
      {status === "viewScats" && (
        <View style={styles.scatsCtr}>
          <FlatList
            data={scatList}
            renderItem={renderScat}
            keyExtractor={(scat, index) => {
              return scat.message_id;
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.iconCtr}>
            <FontAwesome
              name="pencil"
              color="black"
              size={50}
              style={styles.icon}
              onPress={() => setStatus("createScat")}
            />
          </View>
        </View>
      )}
      {status === "createScat" && <CreateScat setStatus={setStatus} />}
    </View>
  );
}

const styles = StyleSheet.create({
  ctr: {
    marginTop: 40,
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
  scatCtr: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    padding: 15,
    width: scatWidth,
    borderRadius: 20,
  },
  Text: {
    fontFamily: "JustAnotherHand",
    fontSize: 40,
  },
  Author: {
    fontFamily: "JustAnotherHand",
    fontSize: 25,
    textAlign: "right",
    width: "100%",
  },
  upvoteCtr: {
    position: "absolute",
    flexDirection: "row",
    left: 30,
    bottom: 8,
  },
  upvoteText: {
    paddingRight: 3,
  },
});
