import React, { Component } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import * as firebase from "firebase";
import "firebase/firestore";
//import { AsyncStorage } from "react-native";
import { AsyncStorage } from "react-native";

export default class OverflowMenu extends Component {
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
          button={<Text onPress={this.showMenu}>Log out</Text>}
        >
          <MenuItem
            // StaysOpenOnClick="True"
            onPressIn={async () => {
              {
                try {
                  //await AsyncStorage.clear();
                  const keys = await AsyncStorage.getAllKeys();
                  await AsyncStorage.multiRemove(keys);

                  //alert("Storage successfully cleared!");
                  //console.log("## cleared");
                  navigation.navigate("Login");
                } catch (e) {
                  //console.log("## un cleared");
                  //alert("Failed to clear the async storage.");
                }
              }
            }}
            onPress={this.hideMenu}
          >
            Click here to Log out
          </MenuItem>
        </Menu>
      </View>
    );
  }
}
