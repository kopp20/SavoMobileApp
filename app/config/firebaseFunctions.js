import firebase from "firebase";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => snapshot.data());
}
