import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Title, FAB } from "react-native-paper";
import Formbutton from "../components/Formbutton";
import Roomscreen from "../screens/Roomscreen";
import Fab from "../components/Fab";
import * as firebase from "firebase";

export default function Featured({ navigation }) {
  // const ref = firebase.firestore();
  // console.log("##ref", ref);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}> No chatroom here </Title>
      <Formbutton
        title="Add new chatroom"
        modevalue="contained"
        onPress={() => navigation.navigate("Addroom")}
      />
      <Formbutton
        title=" Log out"
        modevalue="text"
        uppercase={false}
        style={styles.navButtonText}
        onPress={() => navigation.navigate("Login")}
      />
      <Fab onPress={() => navigation.navigate("Addroom")} />
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
