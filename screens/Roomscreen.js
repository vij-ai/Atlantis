import React, { useState, useEffect } from "react";
import Image, { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";
import Imagepicker from "../components/Imagepicker";

import { NavigationContainer } from "@react-navigation/native";
import Camerapicker from "../components/Camerapicker";
import AsyncStorage from "@react-native-community/async-storage";

var email = "null";
var name = "null";

const getData = async () => {
  try {
    email = await AsyncStorage.getItem("userEmail");
    name = await AsyncStorage.getItem("userName");
    if (email != null) {
      console.log("##emailworking in roomscreen", name);
    } else {
      email = "error";
      console.log("##email not working in chats", email);
    }
  } catch (e) {
    //return isLoggedIn;
    // error reading value
  }
};

export default function RoomScreen({ route, navigation }) {
  useEffect(() => {
    getData();
    //console.log("##useeffect", isLoggedIn);
  }, []);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { thread } = route.params;
  //console.log("@@thread", thread);

  const db = firebase.firestore();

  const ref = firebase
    .firestore()
    .collection("ChatRooms")
    .doc(thread.id)
    .collection("Messages")
    .orderBy("createdAt", "desc");

  // var user = firebase.auth().currentUser;
  // var name, email;

  // if (user != null) {
  //   name = user.displayName;
  //   email = user.email;
  // }

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
    db.collection("ChatRooms")
      .doc(thread.id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
          lastActive: new Date().getTime(),
        },
        { merge: true }
      );
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
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Imagepicker thread={thread.id} />

        <Camerapicker thread={thread.id} />
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
      // isTyping={true}
      renderUsernameOnMessage={true}
      keyboardShouldPersistTaps={false}
      //bottomOffset={240}
      renderActions={images}
      //renderActions={() => <Imagepicker thread={thread.id} />}
      showAvatarForEveryMessage={true}
      onPressAvatar={(user) => {
        navigation.navigate("Privatechat", { user });
      }}
    />
  );
}
