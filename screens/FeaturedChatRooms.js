import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";
import * as firebase from "firebase";
import { useEffect, useState } from "react";

function Item({ id, ChatRoomName, navigation }) {
  console.log("##cha", ChatRoomName);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chats")}
      style={styles.item}
    >
      <Text style={styles.title}>{ChatRoomName}</Text>
    </TouchableOpacity>
  );
}

export default function FeaturedChatRooms({ navigation }) {
  const ref = firebase.firestore().collection("ChatRooms");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        console.log("##doc", doc);
        const { ChatRoomName } = doc.data();
        list.push({
          id: doc.id,
          ChatRoomName,
        });
      });

      console.log("##list", list);

      setData(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return null;
  console.log("##data", data);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            ChatRoomName={item.ChatRoomName}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
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
