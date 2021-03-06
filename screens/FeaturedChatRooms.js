import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Alert,
  Button,
} from "react-native";
import * as firebase from "firebase";

import "firebase/firestore";
import Loading from "../components/Loading";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
//import { Button } from "react-native-paper";
import OverflowMenu from "../components/OverFlowMenu";

export default function FeaturedChatRooms({ navigation, route }) {
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const ref = firebase
    .firestore()
    .collection("ChatRooms")
    .orderBy("lastActive", "desc");
  console.log("@@ref", ref);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log("@@datachatroom", data);
  function Item({ id, ChatRoomName, navigation, jam }) {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chats", {
              thread: jam,
              navigation,
              ChatRoomName,
            })
          }
          style={styles.item}
        >
          <Text style={styles.title}>{ChatRoomName}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    const unsubscribe = ref.onSnapshot((querySnapshot) => {
      const list = querySnapshot.docs.map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,

          ...documentSnapshot.data(),
        };
      });

      setData(list);

      if (loading) {
        setLoading(false);
      }
    });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            ChatRoomName={item.ChatRoomName}
            navigation={navigation}
            jam={item}
          />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<OverflowMenu navigation={navigation} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  item: {
    backgroundColor: "#000000",
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 22,
    color: "#FFFFFF",
  },
});
