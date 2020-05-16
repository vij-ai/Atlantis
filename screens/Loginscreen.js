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

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("login sucessful");
      navigation.navigate("Atlantis");
    } catch (error) {
      alert("Email or password wrong", error);
    }
  };

  const signupUser = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert("Sign up successful");
    } catch (error) {
      alert("Something went wrong", error);
    }
  };

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
