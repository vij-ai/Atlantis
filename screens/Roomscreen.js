import React, { useState, useEffect, useRef } from "react";
import Image, { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";
import Imagepicker from "../components/Imagepicker";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import Camerapicker from "../components/Camerapicker";
import { AsyncStorage, BackHandler } from "react-native";

var email = "null";
var name = "null";

const getData = async () => {
  try {
    email = await AsyncStorage.getItem("userEmail");
    name = await AsyncStorage.getItem("userName");
    if (email != null) {
      // console.log("##emailworking in roomscreen", name);
    } else {
      email = "error";
      //console.log("##email not working in chats", email);
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

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "New message received",
      // body: "And here is the body!",
      //data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("Buda", {
        name: "Buda",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

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

    sendPushNotification(expoPushToken);
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

  // function images() {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: "row",
  //       }}
  //     >
  //       <Imagepicker thread={thread.id} />

  //       <Camerapicker thread={thread.id} />
  //     </View>
  //   );
  // }

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
      //renderActions={images}
      //renderActions={() => <Imagepicker thread={thread.id} />}
      showAvatarForEveryMessage={true}
      // onPressAvatar={(user) => {
      //   navigation.navigate("Privatechat", { user });
      // }}
    />
  );
}
