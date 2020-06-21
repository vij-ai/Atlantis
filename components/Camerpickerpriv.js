import React, { useState, useEffect } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { IconButton, Colors } from "react-native-paper";
import * as firebase from "firebase";
import "firebase/firestore";

export default function Imagepickerpriv({ thread }) {
  const db = firebase.firestore();
  const userEmail = firebase.auth().currentUser.email;
  var user = firebase.auth().currentUser;
  var name, email;

  if (user != null) {
    name = user.displayName;
    email = user.email;
  }
  //console.log("!!usernameimagepcikr", name);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          db.collection("PrivateChat").doc(thread).collection("Messages").add({
            createdAt: new Date().getTime(),
            user: email,
            name: name,
            url: uri,
          });
          console.log("@@uri", uri);
        }
      })

      .catch((error) => {
        throw error;
      });
  };

  return (
    <View>
      <IconButton
        icon="camera"
        color={Colors.red500}
        size={20}
        onPress={pickImage}
      />
    </View>
  );
}
