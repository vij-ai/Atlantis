import React from "react";
import { TextInput, Button, Title } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import Forminput from "../components/Forminput";
import { useState } from "react";
import Formbutton from "../components/Formbutton";
import * as firebase from "firebase";

// const FIREBASE_REF_USERS = firebaseService.database().ref("Users");

export default function Loginscreen({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
      alert("login sucessful");
      navigation.navigate("Atlantis");
    } catch (error) {
      // dispatch(sessionError(error.message));
      console.log("error", error);
    }
  };

  const signupUser = async (email, password) => {
    try {
      console.log("##em", email, password);
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("##res", res);
      alert("signedup sucessful");
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("##email", typeof Email);
  return (
    <View style={styles.container}>
      <Title style={styles.titleText}> Welcome to Atlantis </Title>

      <Forminput
        labelname="Email"
        value={Email}
        autoCapitalize="none"
        onChangeText={(useremail) => setEmail(useremail)}
      />
      <Forminput
        labelname="Password"
        value={Password}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <Formbutton
        title="Log in"
        modevalue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => loginUser(Email, Password)}
      />
      <Formbutton
        title="New user ? Join Atlantic here"
        modevalue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => signupUser(Email, Password)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});
