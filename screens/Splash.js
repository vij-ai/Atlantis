import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";
var email = "null";
var name = "null";

const getData = async (navigation) => {
  try {
    email = await AsyncStorage.getItem("userEmail");
    name = await AsyncStorage.getItem("userName");
    if (email != null) {
      // console.log("##emailworking in splash", email);
      //navigation.navigate("Atlantis", { email, name });
      navigation.navigate("Atlantis", {
        screen: "rooms",
        params: { email: email },
      });
    } else {
      //console.log("##email not working in chats", email);
      navigation.navigate("Login");
    }
  } catch (e) {
    //return isLoggedIn;
    // error reading value
  }
};

export default function Splash({ navigation }) {
  getData(navigation);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6646ee" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
