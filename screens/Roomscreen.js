import React, { useState, useEffect } from "react";
import Image, { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";
import Imagepicker from "../components/Imagepicker";
import Fab from "../components/Fab";

export default function RoomScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { thread } = route.params;

  const db = firebase.firestore();
  const ref = firebase
    .firestore()
    .collection("ChatRooms")
    .doc(thread.id)
    .collection("Messages")
    .orderBy("createdAt", "desc");
  console.log("@@db", db);

  var user = firebase.auth().currentUser;
  var name, email;

  if (user != null) {
    name = user.displayName;
    email = user.email;
  }
  console.log("!!usernameroomsc", name);

  function handleSend(newMessages) {
    const text = newMessages[0].text;

    db.collection("ChatRooms").doc(thread.id).collection("Messages").add({
      text,
      createdAt: new Date().getTime(),
      user: email,
      name: name,
      url: "",

      // _id: userid,
    });
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        console.log("@@doc", doc);
        const ChatMessages = doc.data();
        console.log("@@Chatmessages.url", ChatMessages.url);
        list.push({
          //id: doc.id,
          text: ChatMessages.text,
          createdAt: ChatMessages.createdAt,
          //_id: ChatMessages.from,
          user: {
            _id: ChatMessages.user,
            name: ChatMessages.name,
          },
          image: ChatMessages.url,
        });
      });
      setMessages(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: email, name: name }}
      //minComposerHeight={60}
      alignTop={true}
      // isTyping={true}
      renderUsernameOnMessage={true}
      //scrollToBottom={true}
      // keyboardShouldPersistTaps={
      //   this.props.keyboardShouldPersistTaps
      //     ? this.props.keyboardShouldPersistTaps
      //     : "never"
      // }
      //bottomOffset={240}
      renderActions={() => <Imagepicker thread={thread.id} />}
    />
  );
}
