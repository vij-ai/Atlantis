// In App.js in a new project

import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Mychats from "./screens/Mychats";
import Loginscreen from "./screens/Loginscreen";

import * as firebase from "firebase";

import { Provider as PaperProvider, IconButton } from "react-native-paper";

import NewOverflowMenu from "./components/NewOverflowMenu";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoomScreen from "./screens/Roomscreen";
import AddRoomScreen from "./screens/Addroomscreen";
import { Button, Paragraph, Menu, Divider, Provider } from "react-native-paper";
import { useState } from "react";
import FeaturedChatRooms from "./screens/FeaturedChatRooms";
import Formbutton from "./components/Formbutton";
import "firebase/firestore";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const tab = createMaterialTopTabNavigator();

function Home() {
  return (
    <tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, color: "white" },
        //style: { backgroundColor: "black" },
        style: {
          backgroundColor: "black",
          borderTopWidth: 1,
          borderTopColor: "#D3D3D3",
        },
        indicatorStyle: {
          backgroundColor: "#6200EE",
          height: 4,
        },
      }}
    >
      <tab.Screen name="Featured" component={FeaturedChatRooms} />
      <tab.Screen name="My chats" component={Mychats} />
    </tab.Navigator>
  );
}

const Stack = createStackNavigator();

function Logo() {
  return (
    <View>
      <Image
        source={{
          uri:
            "https://see.fontimg.com/api/renderfont4/8VA2/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/bG9uZWx5/quite-magical-regular.png",
        }}
        style={{
          width: 100,
          height: 40,
          marginLeft: 15,
          resizeMode: "stretch",
        }}
      />
    </View>
  );
}

export default function app() {
  function initializeFirebase() {
    var firebaseConfig = {
      apiKey: "AIzaSyAFlBWkTcp4vmKuIvbWFasE_yrcVXAGq74",
      authDomain: "atlantis-ce3e8.firebaseapp.com",
      databaseURL: "https://atlantis-ce3e8.firebaseio.com",
      projectId: "atlantis-ce3e8",
      storageBucket: "atlantis-ce3e8.appspot.com",
      messagingSenderId: "615161226701",
      appId: "1:615161226701:web:b595c5f9deb0e62f4fd084",
      measurementId: "G-VTE9LVM7G6",
    };
    firebase.initializeApp(firebaseConfig);
  }

  initializeFirebase();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Loginscreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Atlantis"
            component={Home}
            options={({ navigation }) => ({
              headerTitle: false,
              //headerTitleStyle: { fontweight: "bold" },
              headerLeft: () => <Logo />,
              headerRight: () => (
                <Formbutton
                  title="New Chatroom"
                  onPress={() => navigation.navigate("Addroom")}
                  uppercase={false}
                />
              ),
              //<NewOverflowMenu />,
            })}
          />
          <Stack.Screen name="Chats" component={RoomScreen} />
          <Stack.Screen name="Addroom" component={AddRoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
