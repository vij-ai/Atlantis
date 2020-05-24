import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";

export default function RoomScreen({ route }) {
  const [messages, setMessages] = useState([]);
  console.log("@@route", route);
  const { thread } = route.params;
  console.log("@@thread", thread.id);

  const db = firebase.firestore();
  const ref = firebase
    .firestore()
    .collection("ChatRooms")
    .doc(thread.id)
    .collection("Messages")
    .orderBy("createdAt", "desc");
  console.log("@@ref", ref);

  function handleSend(newMessages) {
    const text = newMessages[0].text;

    db.collection("ChatRooms").doc(thread.id).collection("Messages").add({
      text,
      createdAt: new Date().getTime(),
      //from: "rajith",
    });
    console.log("@@text", text);
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        console.log("@@doc", doc);
        const ChatMessages = doc.data();
        console.log("@@Chatmessages", ChatMessages);
        list.push({
          id: doc.id,
          text: ChatMessages.text,
          createdAt: ChatMessages.createdAt,
          ChatMessages,
        });
        console.log("@@list", list);
      });
      setMessages(list);
    });
  }, []);

  // helper method that is sends a message
  // function handleSend(newMessage = []) {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      //user={{ _id: 1 }}
    />
  );
}
