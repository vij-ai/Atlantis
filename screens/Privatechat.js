import React, { useState, useEffect } from "react";
import Image, { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";
import Imagepickerpriv from "../components/Imagepickerpriv";
import Camerapickerpriv from "../components/Camerpickerpriv";
import AsyncStorage from "@react-native-community/async-storage";

var email = "null";
var name = "null";

const getData = async () => {
  try {
    email = await AsyncStorage.getItem("userEmail");
    name = await AsyncStorage.getItem("userName");
    if (email != null) {
      console.log("##emailworking in privchat", name);
    } else {
      email = "error";
      console.log("##email not working in chats", email);
    }
  } catch (e) {
    //return isLoggedIn;
    // error reading value
  }
};

export default function Privatechat({ route, navigation }) {
  useEffect(() => {
    getData();
    //console.log("##useeffect", isLoggedIn);
  }, []);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const otheruser = route.params.user._id;
  const otherusername = route.params.user.name;
  console.log("@@user", route);

  const db = firebase.firestore();

  // var user = firebase.auth().currentUser;
  // var name, email;

  // if (user != null) {
  //   name = user.displayName;
  //   email = user.email;
  // }

  const otheruserID = otheruser;
  const chateeID = email;
  const chatIDpre = [];
  chatIDpre.push(otheruserID);
  chatIDpre.push(chateeID);
  chatIDpre.sort();
  const chatID = chatIDpre.join("_");

  db.collection("Personal").doc(email).collection(email).doc(otheruser).set({
    _id: otheruser,
    name: otherusername,
    lastActive: new Date().getTime(),
  });
  db.collection("Personal")
    .doc(otheruser)
    .collection(otheruser)
    .doc(email)
    .set({
      _id: email,
      name: name,
      lastActive: new Date().getTime(),
    });

  const ref = firebase

    .firestore()
    .collection("PrivateChat")
    .doc(chatID)
    .collection("Messages")

    .orderBy("createdAt", "desc");

  function handleSend(newMessages) {
    const text = newMessages[0].text;

    db.collection("PrivateChat").doc(chatID).collection("Messages").add({
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
        const ChatMessages = doc.data();
        list.push({
          _id: doc.id,
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
  function images() {
    return (
      <View style={{ flexDirection: "row" }}>
        <Imagepickerpriv thread={chatID} />
        <Camerapickerpriv thread={chatID} />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: email, name: name }}
      minComposerHeight={46.7}
      alignTop={true}
      //isTyping={true}
      renderUsernameOnMessage={true}
      //scrollToBottom={true}
      keyboardShouldPersistTaps="never"
      //bottomOffset={240}
      //renderActions={images}
      showAvatarForEveryMessage={true}
      //infiniteScroll={true}
    />
  );
}
