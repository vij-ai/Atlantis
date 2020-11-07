// In App.js in a new project

import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect } from "react";
import Mychats from "./screens/Mychats";
import Loginscreen from "./screens/Loginscreen";
import Formbutton from "./components/Formbutton";

import * as firebase from "firebase";

import {
  Provider as PaperProvider,
  IconButton,
  Title,
} from "react-native-paper";

import RoomScreen from "./screens/Roomscreen";
import AddRoomScreen from "./screens/Addroomscreen";

import FeaturedChatRooms from "./screens/FeaturedChatRooms";

import "firebase/firestore";
import { decode, encode } from "base-64";
import Signupscreen from "./screens/Signupscreen";
import AsyncStorage from "@react-native-community/async-storage";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import { YellowBox } from "react-native";
import _ from "lodash";
import Privatechat from "./screens/Privatechat";
import OverflowMenu from "./components/OverFlowMenu";
import Splash from "./screens/Splash";

import Terms from "./screens/Terms";
import Loading from "./components/Loading";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

//var isLoggedIn;

const tab = createMaterialTopTabNavigator();

function Home() {
  //console.log("@@route home", route);
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
      <tab.Screen name="rooms" component={FeaturedChatRooms} />
      <tab.Screen name="Private chats" component={Mychats} />
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
            "https://see.fontimg.com/api/renderfont4/3zRBM/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/QnVkYQ/attack-graffiti.png",
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
// const getData = async () => {
//   //console.log("##inside async");
//   try {
//     const value = await AsyncStorage.getItem("userEmail");
//     if (value != null) {
//       // isLoggedIn = true;
//       //console.log("##getvalue", isLoggedIn);
//       console.log("##value", value);
//       return value;

//       // value previously stored
//     } else {
//       //isLoggedIn = false;
//       console.log("## no value", value);
//       return value;
//     }
//   } catch (e) {
//     //return isLoggedIn;
//     // error reading value
//   }
// };

export default function app() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  //setIsLoggedIn(getData);

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

  if (firebase.apps.length === 0) {
    initializeFirebase();
  }
  // getData();
  // console.log("##usersignedin1");

  // useEffect(() => {
  //   getData();
  //   // console.log("##useeffect", isLoggedIn);
  // }, []);

  // if (!isLoggedIn) {
  //   var user = firebase.auth().currentUser;
  //   if (user) {
  //     console.log("##usersignedin", user);
  //     isLoggedIn = true;
  //   } else {
  //     isLoggedIn = false;
  //     console.log("##usernotsignedin", isLoggedIn);
  //   }
  // }
  //const loggedIn = { isLoggedIn };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
            // options={{ navigation }}
          />

          <Stack.Screen
            name="Login"
            component={Loginscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign up"
            component={Signupscreen}
            //options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Terms"
            component={Terms}
            options={{ title: "Terms and Privacy " }}
          />
          <Stack.Screen
            name="Atlantis"
            component={Home}
            options={({ navigation }) => ({
              headerTitle: false,
              //headerTitleStyle: { fontweight: "bold" },
              headerLeft: () => <Logo />,
              headerRight: () => <OverflowMenu navigation={navigation} />,

              // <Formbutton
              //   title="New Chatroom"
              //   onPress={() => navigation.navigate("Addroom")}
              //   uppercase={false}
              // />
            })}
          />
          <Stack.Screen
            name="Chats"
            component={RoomScreen}
            options={({ navigation, route }) => ({
              title: route.params.ChatRoomName,
            })}
          />
          <Stack.Screen
            name="Addroom"
            component={AddRoomScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Privatechat"
            component={Privatechat}
            options={({ navigation, route }) => ({
              title: route.params.user.name,
            })}
          />
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
