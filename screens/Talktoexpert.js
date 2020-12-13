import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { IconButton, Title } from "react-native-paper";
import FormInput from "../components/Forminput";
import FormButton from "../components/Formbutton";
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
      // console.log("##emailworking in roomscreen", name);
    } else {
      email = "error";
      // console.log("##email not working in chats", email);
    }
  } catch (e) {
    //return isLoggedIn;
    // error reading value
  }
};

export default function Talktoexpert({ navigation }) {
  useEffect(() => {
    getData();
    //console.log("##useeffect", isLoggedIn);
  }, []);

  const [phone, setPhone] = useState("");
  // ... Firestore query will come here later

  const handleButtonPress = (phone) => {
    const db = firebase.firestore();
    // db.settings({
    //   timestampsInSnapshots: true,
    // });
    db.collection("PhoneNumbers").add({
      UserPhone: phone,
      Email: email,
      Username: name,
      createdAt: new Date().getTime(),
      lastActive: new Date().getTime(),
    });
    alert("Buda will contact you soon to schedule a session.");
    navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Enter your Tel no</Title>
        <Title style={styles.title}>
          and take a free session with a meditation expert
        </Title>
        <FormInput
          labelname="contact number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          clearButtonMode="while-editing"
          keyboardType="numeric"
        />
        <FormButton
          title="Done"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress(phone)}
          disabled={phone.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: Dimensions.get("window").width * 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    //marginBottom: 10,
    //marginHorizontal: Dimensions.get("window").width * 0.13,
    //justifyContent: "center",
    //alignItems: "center",
  },
  buttonLabel: {
    fontSize: 22,
  },
});
