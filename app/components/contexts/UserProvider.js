import React, { createContext, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import firebase from "firebase";
import { useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  const fetchUser = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        if (snapshot.exists) {
          setUser(snapshot.data());
        }
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const userInfo = () => useContext(UserContext);

export default UserProvider;
