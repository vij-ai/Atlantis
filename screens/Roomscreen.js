import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";

export default function RoomScreen(page) {
  console.log("@@", page);

  const db = firebase.firestore();

  db.collection("ChatRooms")
    .doc("PhXwQfd7pSVJdMvRCsxW")
    .collection("Messages")
    .add({
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

// import React, { useState, useContext, useEffect } from "react";
// import {
//   GiftedChat,
//   Bubble,
//   Send,
//   SystemMessage,
// } from "react-native-gifted-chat";
// import { ActivityIndicator, View, StyleSheet } from "react-native";
// import { IconButton } from "react-native-paper";

// import * as firebase from "firebase";

// //db.collection("rooms").doc("roomA").collection("messages").doc("message1");

// export default function RoomScreen() {
//   const db = firebase.firestore();

//   const [messages, setMessages] = useState([]);

//   async function handleSend(messages) {
//     console.log("@@test", text);
//     const text = messages[0].text;

//     db.collection("ChatRooms").doc("Room1").collection("Messages").add({
//       text,
//       createdAt: new Date().getTime(),
//       from: "rajith",
//       // user: {
//       //   _id: currentUser.uid,
//       //   email: currentUser.email
//       // }
//     });
//   }

//   useEffect(() => {
//     const messagesListener = firebase
//       .firestore()
//       .collection("ChatRooms")
//       .doc("Room1")
//       .collection("Messages")
//       .orderBy("createdAt", "desc")
//       .onSnapshot((querySnapshot) => {
//         const messages = querySnapshot.docs.map((doc) => {
//           const firebaseData = doc.data();
//           console.log("@@data", data);

//           const data = {
//             _id: doc.id,
//             text: "",
//             createdAt: new Date().getTime(),
//             ...firebaseData,
//           };

//           if (!firebaseData.system) {
//             data.user = {
//               ...firebaseData.user,
//               name: firebaseData.user.email,
//             };
//           }

//           return data;
//         });

//         setMessages(messages);
//       });

//     // Stop listening for updates whenever the component unmounts
//     return () => messagesListener();
//   }, []);

//   function renderBubble(props) {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: "#6646ee",
//           },
//         }}
//         textStyle={{
//           right: {
//             color: "#fff",
//           },
//         }}
//       />
//     );
//   }

//   function renderLoading() {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6646ee" />
//       </View>
//     );
//   }

//   function renderSend(props) {
//     return (
//       <Send {...props}>
//         <View style={styles.sendingContainer}>
//           <IconButton icon="send-circle" size={32} color="#6646ee" />
//         </View>
//       </Send>
//     );
//   }

//   function scrollToBottomComponent() {
//     return (
//       <View style={styles.bottomComponentContainer}>
//         <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
//       </View>
//     );
//   }

//   function renderSystemMessage(props) {
//     return (
//       <SystemMessage
//         {...props}
//         wrapperStyle={styles.systemMessageWrapper}
//         textStyle={styles.systemMessageText}
//       />
//     );
//   }

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={handleSend}
//       //user={{ _id: currentUser.uid }}
//       placeholder="Type your message here..."
//       alwaysShowSend
//       showUserAvatar
//       scrollToBottom
//       renderBubble={renderBubble}
//       renderLoading={renderLoading}
//       renderSend={renderSend}
//       scrollToBottomComponent={scrollToBottomComponent}
//       renderSystemMessage={renderSystemMessage}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   sendingContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   bottomComponentContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   systemMessageWrapper: {
//     backgroundColor: "#6646ee",
//     borderRadius: 4,
//     padding: 5,
//   },
//   systemMessageText: {
//     fontSize: 14,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
