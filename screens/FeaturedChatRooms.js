import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as firebase from "firebase";
import { useEffect, useState } from "react";
import "firebase/firestore";
import Loading from "../components/Loading";

export default function FeaturedChatRooms({ navigation }) {
  const ref = firebase.firestore().collection("ChatRooms");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function Item({ id, ChatRoomName, navigation, jam }) {
    //console.log("##cha", ChatRoomName);

    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chats", { thread: jam })}
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
