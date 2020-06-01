import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";

export default function RoomScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
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
  console.log("@@db", db);

  const userEmail = firebase.auth().currentUser.email;
  const userid = firebase.auth().currentUser.uid;
  //console.log("@@user", user);

  function handleSend(newMessages) {
    const text = newMessages[0].text;

    db.collection("ChatRooms").doc(thread.id).collection("Messages").add({
      text,
      createdAt: new Date().getTime(),
      user: userEmail,
      // _id: userid,
    });
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        console.log("@@doc", doc);
        const ChatMessages = doc.data();
        console.log("@@Chatmessages", ChatMessages);
        list.push({
          //id: doc.id,
          text: ChatMessages.text,
          createdAt: ChatMessages.createdAt,
          //_id: ChatMessages.from,
          user: { _id: ChatMessages.user },
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
      user={{ _id: userEmail }}
      minComposerHeight={60}
      alignTop={true}
    />
  );
}
