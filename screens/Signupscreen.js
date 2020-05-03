import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Title, IconButton } from "react-native-paper";
import FormInput from "../components/Forminput";
import FormButton from "../components/Formbutton";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Register to chat</Title>
      <FormInput
        labelname="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <Text style={{ textAlign: "left", color: "grey" }}>
        *You are completly anonymous. The Email is only to recover your password
        if lost*
      </Text>
      <FormInput
        labelname="New Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <FormButton
        title="Next"
        modevalue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => navigation.navigate("Signup1")}
      />
      <IconButton
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        color="#6646ee"
        onPress={() => navigation.goBack()}
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
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});