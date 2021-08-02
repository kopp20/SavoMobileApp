import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
} from "react-native-gifted-chat";
import { auth, db } from "../../firebase";
import Screen from "../components/Screen";

function ChatScreen(props) {
  const [messages, setMessages] = useState([]);

  /*  useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ]);
    }, []); */

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#252634",
          },
          right: {
            backgroundColor: "#834CFF",
          },
        }}
        textStyle={{
          left: {
            color: "white",
          },
          right: {
            color: "white",
          },
        }}
      />
    );
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    db.collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#262736",
          borderTopWidth: 0,
        }}
        textStyle={{
          color: "white",
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E2A" }}>
      <GiftedChat
        renderUsernameOnMessage
        alwaysShowSend
        renderInputToolbar={(props) => customtInputToolbar(props)}
        renderBubble={renderBubble}
        textInputStyle={{
          color: "white",
        }}
        renderComposer={(props) => {
          return <Composer {...props} placeholder={"Type eine Nachricht..."} />;
        }}
        showAvatarForEveryMessage
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          avatar: auth?.currentUser?.photoURL,
        }}
      />
    </View>
  );
}

export default ChatScreen;
