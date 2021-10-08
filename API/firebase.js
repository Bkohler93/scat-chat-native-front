import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(email, password) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  const currentUser = firebase.auth().currentUser;
  const db = firebase.firestore();
  db.collection("users").doc(currentUser.uid).set({
    email: currentUser.email,
  });
}

export async function signIn(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
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
