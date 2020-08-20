import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import AddRoomScreen from "../screens/Addroomscreen";
import { NavigationContainer } from "@react-navigation/native";
//import icon from "../assets/menu.png";
import * as firebase from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";

export default class OverflowMenu extends React.PureComponent {
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    const { navigation } = this.props;

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
          {/* <MenuItem onPress={() => navigation.navigate("Addroom")}>
            New Chatroom
          </MenuItem> */}
          {/* <MenuDivider /> */}
          <MenuItem
            onPress={async () => {
              {
                try {
                  //await AsyncStorage.clear();
                  const keys = await AsyncStorage.getAllKeys();
                  await AsyncStorage.multiRemove(keys);

                  //alert("Storage successfully cleared!");
                  //console.log("## cleared");
                  navigation.navigate("Login");
                } catch (e) {
                  console.log("## un cleared");
                  //alert("Failed to clear the async storage.");
                }
              }

              // firebase
              //   .auth()
              //   .signOut()
              //   .then(function () {
              //     navigation.navigate("Login");
              //   })
              //   .catch(function (error) {
              //     // An error happened.
              //   });
            }}
          >
            Log out
          </MenuItem>
        </Menu>
      </View>
    );
  }
}
