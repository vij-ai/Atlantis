import React from "react";
import { TextInput, Button, Title } from "react-native-paper";
import { View, Text, StyleSheet, Image } from "react-native";
import Forminput from "../components/Forminput";
import { useState } from "react";
import Formbutton from "../components/Formbutton";
import * as firebase from "firebase";

export default function Signupscreen({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const signupUser = async (email, password, userName) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      if (user != null) {
        user
          .updateProfile({
            displayName: userName,
          })
          .then(function () {
            console.log("!!Update successful");
          })
          .catch(function (error) {
            alert(error.message, error);
          });
        console.log("!!username", user.displayName);
      }
      alert("Sign up successful");
      navigation.navigate("Atlantis");
    } catch (error) {
      alert(error.message, error);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Buda</Title>
      <Title style={styles.titleText}>The anonymous chat app</Title>

      <Forminput
        labelname="Username"
        value={userName}
        autoCapitalize="none"
        onChangeText={(userName) => setUserName(userName)}
      />

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
      <View style={{ flexDirection: "row" }}>
        <Text>Via sigining up you accept the </Text>
        <Text
          style={{ textDecorationLine: "underline" }}
          onPress={() => navigation.navigate("Terms")}
        >
          Terms and privay policy
        </Text>
      </View>

      <Formbutton
        title="Sign up"
        modevalue="contained"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => signupUser(Email, Password, userName)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
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
  smallerText: {
    fontSize: 12,
  },
});
