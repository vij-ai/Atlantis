import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import * as firebase from "firebase";
import { useEffect, useState } from "react";
import "firebase/firestore";
import Loading from "../components/Loading";

export default function Mychats({ navigation }) {
  const db = firebase.firestore();
  var user = firebase.auth().currentUser;
  var name, email;

  if (user != null) {
    name = user.displayName;
    email = user.email;
  }

  var ref = db
    .collection("Personal")
    .doc(email)
    .collection(email)
    .orderBy("lastActive", "desc");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function Item({ id, navigation, user }) {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Privatechat", {
              user,
            })
          }
          style={styles.item}
        >
          <Text style={styles.title}>{user.name}</Text>
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
          <Item id={item.id} navigation={navigation} user={item} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: Dimensions.get("window").height * 0.2,
            }}
          >
            <Image
              source={{
                uri:
                  "https://see.fontimg.com/api/renderfont4/ZVJPZ/eyJyIjoiZnMiLCJoIjoxMTcsInciOjEwMDAsImZzIjoxMTcsImZnYyI6IiMxNjE3MTYiLCJiZ2MiOiIjRkZGOUY5IiwidCI6MX0/bm8gY2hhdHM/attack-graffiti.png",
              }}
              style={{
                width: Dimensions.get("window").width * 0.7,
                height: 80,
                //marginHorizontal: 15,
                resizeMode: "stretch",
              }}
            />
          </View>
        )}
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
