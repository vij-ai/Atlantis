<Stack.Screen
  name="Atlantis"
  component={Home}
  options={({ navigation }) => ({
    headerTitleStyle: { fontweight: "bold" },
    headerLeft: false,
    headerRight: () => (
      <Formbutton
        title="Menu"
        modevalue="text"
        uppercase={false}
        style={styles.navButtonText}
        onPress={() => navigation.navigate("Addroom")}
      />
    ),
  })}
/>;
