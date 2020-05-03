import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Title, IconButton } from "react-native-paper";
import FormInput from "../components/Forminput";
import FormButton from "../components/Formbutton";
import SwitchSelector from "react-native-switch-selector";

export default function SignupScreen1({ navigation }) {
  const [email, setEmail] = useState("");
  const [nickname, setnickname] = useState("");
  const [toggle, settoggle] = useState("m");

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Select your Genter below </Title>
      <SwitchSelector
        initial={0}
        //onPress={(value) => settoggle(value)}
        textColor={"#7a44cf"}
        selectedColor={"#ffffff"}
        buttonColor={"#7a44cf"}
        borderColor={"#7a44cf"}
        hasPadding
        options={[
          { label: "Female", value: "f" },
          { label: "Male", value: "m" },
        ]}
      />

      <FormInput
        labelname="Type nick name"
        value={nickname}
        onChangeText={(nickname) => setnickname(nickname)}
      />
      <FormButton
        title="Signup"
        modevalue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => navigation.navigate("Atlantis")}
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
