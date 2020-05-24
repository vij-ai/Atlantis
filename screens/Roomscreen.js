import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";

export default function RoomScreen({ route }) {
  console.log("@@route", route);
  const { thread } = route.params;
  console.log("@@thread", thread.id);

  const db = firebase.firestore();

  db.collection("ChatRooms").doc(thread.id).collection("Messages").add({
    text: "this is a a random text",
    createdAt: new Date().getTime(),
    from: "rajith",
  });

  console.log("@@db", db);

  const [messages, setMessages] = useState([]);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{ _id: 1 }}
    />
  );
}
