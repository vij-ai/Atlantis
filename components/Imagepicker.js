import React, { useState, useEffect } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { IconButton, Colors } from "react-native-paper";
import * as firebase from "firebase";
import "firebase/firestore";
import { AsyncStorage } from "react-native";

var email = "null";
var name = "null";

const getData = async () => {
  try {
    email = await AsyncStorage.getItem("userEmail");
    name = await AsyncStorage.getItem("userName");
    if (email != null) {
      console.log("##emailworking in imagepicker", name);
    } else {
      email = "error";
      console.log("##email not working in chats", email);
    }
  } catch (e) {
    //return isLoggedIn;
    // error reading value
  }
};

export default function Imagepicker({ thread }) {
  useEffect(() => {
    getData();
    //console.log("##useeffect", isLoggedIn);
  }, []);
  const db = firebase.firestore();
  // const userEmail = firebase.auth().currentUser.email;
  // var user = firebase.auth().currentUser;
  // var name, email;

  // if (user != null) {
  //   name = user.displayName;
  //   email = user.email;
  // }

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri, base64 } = result;
          console.log("##image", base64);
          db.collection("ChatRooms").doc(thread).collection("Messages").add({
            createdAt: new Date().getTime(),
            user: email,
            name: name,
            url: uri,
          });

          db.collection("ChatRooms").doc(thread).set(
            {
              lastActive: new Date().getTime(),
            },
            { merge: true }
          );
        }
      })

      .catch((error) => {
        throw error;
      });
  };

  return (
    <View>
      <IconButton
        icon="camera-burst"
        color={Colors.red500}
        size={20}
        onPress={pickImage}
      />
    </View>
  );
}
