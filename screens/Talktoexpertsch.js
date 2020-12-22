import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, BackHandler, Alert } from "react-native";
import { IconButton, Title } from "react-native-paper";
import FormInput from "../components/Forminput";
import FormButton from "../components/Formbutton";
import * as firebase from "firebase";
import "firebase/firestore";
import { AsyncStorage } from "react-native";

import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Talktoexpertsch({ navigation }) {
  const backAction = () => {
    Alert.alert("Go back to app?", "Hope you have scheduled a session", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => navigation.goBack() },
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <WebView
      source={{ uri: "https://calendly.com/vijithpad/meditate" }}
      style={{ marginTop: 10 }}
    />
  );
}

// const styles = StyleSheet.create({
//   rootContainer: {
//     flex: 1,
//   },
//   closeButtonContainer: {
//     position: "absolute",
//     top: 30,
//     right: 0,
//     zIndex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     marginHorizontal: Dimensions.get("window").width * 0.13,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     //marginBottom: 10,
//     //marginHorizontal: Dimensions.get("window").width * 0.13,
//     //justifyContent: "center",
//     //alignItems: "center",
//   },
//   buttonLabel: {
//     fontSize: 22,
//   },
// });
