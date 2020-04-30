// In App.js in a new project

import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Featured from "./screens/Featured";
import Mychats from "./screens/Mychats";
import Loginscreen from "./screens/Loginscreen";
import SignupScreen from "./screens/Signupscreen";
import { Provider as PaperProvider } from "react-native-paper";

const stack = createStackNavigator();

const tab = createMaterialTopTabNavigator();

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

const Stack = createStackNavigator();
//asdasdasdasdcomment

export default function app() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Loginscreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <stack.Screen
            name="Atlantis"
            component={Home}
            options={{
              headerTitleStyle: { fontweight: "bold" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
