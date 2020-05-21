import * as React from "react";
import { View } from "react-native";
import { Button, Paragraph, Menu, Divider, Provider } from "react-native-paper";

export default class OverFlowMenu extends React.Component {
  state = {
    visible: false,
  };

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
    return (
      <Provider>
        <View
          style={{
            paddingTop: 10,
            // flexDirection: "row",
            // justifyContent: "center",
          }}
        >
          <Menu
            visible={this.state.visible}
            onDismiss={this._closeMenu}
            anchor={
              <Button onPress={this._openMenu}>asdasds asdasd Menu</Button>
            }
          >
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </View>
      </Provider>
    );
  }
}
