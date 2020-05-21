// In App.js in a new project

import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Featured from "./screens/Featured";
import Mychats from "./screens/Mychats";
import Loginscreen from "./screens/Loginscreen";
import SignupScreen from "./screens/Signupscreen";
import * as firebase from "firebase";

import { Provider as PaperProvider, IconButton } from "react-native-paper";
import Signupscreen1 from "./screens/Signupscreen1";
import NewOverflowMenu from "./components/NewOverflowMenu";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoomScreen from "./screens/Roomscreen";
import AddRoomScreen from "./screens/Addroomscreen";
import { Button, Paragraph, Menu, Divider, Provider } from "react-native-paper";
import { useState } from "react";
import FeaturedChatRooms from "./screens/FeaturedChatRooms";

const tab = createMaterialTopTabNavigator();

function Home() {
  return (
    <tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, color: "white" },
        style: { backgroundColor: "black" },
      }}
    >
      <tab.Screen name="Featured" component={FeaturedChatRooms} />
      <tab.Screen name="My chats" component={Mychats} />
    </tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function app() {
  const initializeFirebase = () => {
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
  };

  initializeFirebase();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Atlantis">
          <Stack.Screen
            name="Login"
            component={Loginscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup1"
            component={Signupscreen1}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Atlantis"
            component={Home}
            options={({ navigation }) => ({
              headerTitleStyle: { fontweight: "bold" },
              headerLeft: false,
              headerRight: () => <NewOverflowMenu />,
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
