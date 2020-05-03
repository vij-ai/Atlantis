import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Title } from "react-native-paper";
import Formbutton from "../components/Formbutton";

export default function Mychats({ navigation }) {
  return (
    <View style={styles.container}>
      <Title style={styles.titleText}> No chatroom here </Title>
      <Formbutton
        title="Start a private chat"
        modevalue="contained"
        //onPress={() => navigation.navigate('')}
      />
      <Formbutton
        title=" Log out"
        modevalue="text"
        uppercase={false}
        style={styles.navButtonText}
        onPress={() => navigation.navigate("Login")}
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
