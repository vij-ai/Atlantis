// In App.js in a new project

import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Featured from "./screens/Featured";
import Mychats from "./screens/Mychats";
import Loginscreen from "./screens/Loginscreen";
import SignupScreen from "./screens/Signupscreen";
import {
  Provider as PaperProvider,
  IconButton,
  Menu,
} from "react-native-paper";
import Signupscreen1 from "./screens/Signupscreen1";
import Overflowmenu from "./components/Overflowmenu";
import Formbutton from "./components/Formbutton";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoomScreen from "./screens/Roomscreen";
import AddRoomScreen from "./screens/Addroomscreen";

const stack = createStackNavigator();

const tab = createMaterialTopTabNavigator();

// _openMenu = () => this.setState({ visible: true });

// _closeMenu = () => this.setState({ visible: false });

function Home() {
  return (
    <tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, color: "white" },
        style: { backgroundColor: "black" },
      }}
    >
      <tab.Screen name="Featured" component={Featured} />
      <tab.Screen name="My chats" component={Mychats} />
    </tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function app() {
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
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup1"
            component={Signupscreen1}
            options={{ headerShown: false }}
          />

          <stack.Screen
            name="Atlantis"
            component={Home}
            options={({ navigation }) => ({
              headerTitleStyle: { fontweight: "bold" },
              headerRight: () => (
                <Formbutton
                  title=" New Chatroom"
                  modevalue="text"
                  uppercase={false}
                  style={styles.navButtonText}
                  onPress={() => navigation.navigate("Addroom")}
                />
              ),
            })}
          />
          <stack.Screen name="Chats" component={RoomScreen} />
          <stack.Screen name="Addroom" component={AddRoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// export function App() {
//   return (
//     <NavigationContainer>
//       <stack.Navigator>
//         <stack.Screen
//           name="Atlantis"
//           component={Home}
//           options={{
//             headerTitleStyle: { fontweight: "bold" },
//           }}
//         />
//       </stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default test;

// function test() {
//   return(
//   <Loginscreen/>
//   )
// }
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

{
  /* <Formbutton
                  title="More"
                  modevalue="text"
                  uppercase={false}
                  labelStyle={styles.navButtonText}
                  onPress={() => <Overflowmenu />}
                /> */
}
