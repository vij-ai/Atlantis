import {
  Provider as PaperProvider,
  IconButton,
  Menu,
} from "react-native-paper";

import * as React from "react";
import { View, Text, Button } from "react-native";

export default function overflowmenu() {
  return (
    <View>
      <Menu
        visible={true}
        //onDismiss={this._closeMenu}
        //anchor={<Button title="hithere" />}
      >
        <Menu.Item title="Item 1" />
        <Menu.Item title="Item 2" />

        <Menu.Item title="Item 3" />
      </Menu>
    </View>
  );
}
