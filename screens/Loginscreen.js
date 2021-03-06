import React from "react";
import { TextInput, Button, Title } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import Forminput from "../components/Forminput";
import { useState, useEffect } from "react";
import Formbutton from "../components/Formbutton";
import * as firebase from "firebase";
import WavyHeader from "../components/WavyHeader";
import Loading from "../components/Loading";
import { AsyncStorage } from "react-native";

export default function Loginscreen({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const storeLoginData = async (email, userName) => {
    try {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userName", userName);

      //console.log("##asy username", userName);
      // console.log("##async email", email);
    } catch (e) {
      // saving error
    }
  };

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      var user = firebase.auth().currentUser;
      var name;

      if (user != null) {
        name = user.displayName;
      }
      storeLoginData(email, name);
      navigation.navigate("Atlantis");
    } catch (error) {
      alert(error.message, error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        // justifyContent: "space-between",
      }}
    >
      <StatusBar backgroundColor="#000000" />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <WavyHeader
          customStyles={styles.svgCurve}
          customHeight={160}
          customTop={130}
          customBgColor="#000000"
          customWavePattern="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />

        <View style={styles.headerContainer}>
          <Image
            source={{
              uri:
                "https://see.fontimg.com/api/renderfont4/3zRBM/eyJyIjoiZnMiLCJoIjoxNzcsInciOjEwMDAsImZzIjoxNzcsImZnYyI6IiNGREZERkQiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/YnVkYQ/attack-graffiti.png",
            }}
            style={{
              width: 200,
              height: 80,
              //marginHorizontal: 15,
              resizeMode: "stretch",
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Title style={styles.titleText}> The anonymous chat app</Title>
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
          title="Sign up"
          modevalue="text"
          uppercase={false}
          labelStyle={styles.navButtonText}
          onPress={() => navigation.navigate("Sign up")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 2,
    backgroundColor: "#f5f5f5",

    //justifyContent: "center",
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
  headerContainer: {
    marginTop: Dimensions.get("window").height * 0.1,
    marginHorizontal: Dimensions.get("window").width * 0.23,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 35,
  },
});
