import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import AddRoomScreen from "../screens/Addroomscreen";
import { NavigationContainer } from "@react-navigation/native";
//import icon from "../assets/menu.png";

export default class OverflowMenu extends React.PureComponent {
  _menu = null;
  navigation = this.props;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  // newChatRoom = (navigation) => {
  //   this._menu.hide();
  //   {
  //     navigation.navigate("Addroom");
  //   }
  // };

  render() {
    const { navigation } = this.props;
    // newChatRoom = () => {
    //   this._menu.hide();
    //   {
    //     navigation.navigate("Addroom");
    //   }
    // };

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5,
        }}
      >
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
          <MenuItem onPress={() => navigation.navigate("Addroom")}>
            New Chatroom
          </MenuItem>
          {/* //<MenuItem onPress={this.newChatRoom}>New private message</MenuItem> */}
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
      </View>
    );
  }
}
