import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function registration(email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      language_filter: true,
      time_warned: null,
      time_created: new Date(),
      warnings: 0,
    });
  } catch (err) {
    console.log("Problem creating account");
    console.log(err);
    return err;
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    return err;
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function checkUserAuth() {
  try {
    const auth = await firebase.auth();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  } catch (err) {
    console.log("Error reaching firebase..");
    console.log(err);
  }
}

export async function getEmails() {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    const ref = db.collection("users").doc(currentUser.uid);
    const doc = await ref.get();
    const email = doc.data()["email"];
    return email;
  } catch (err) {
    console.log("error", err);
  }
}

export async function getAllScats() {
  try {
    const db = firebase.firestore();
    const ref = db.collection("scats");
    const scatsData = await ref.get();
    return scatsData;
  } catch (err) {
    console.log("error retreiving scatchats", err);
  }
}

export async function submitScat(scatChat) {
  try {
    console.log(scatChat);
    const db = firebase.firestore();
    const res = await db
      .collection("scats")
      .doc(scatChat.message_id)
      .set(scatChat);
  } catch (err) {
    console.log("error submitting scat", err);
  }
}
