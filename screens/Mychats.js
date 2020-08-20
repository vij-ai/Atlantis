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
import AsyncStorage from "@react-native-community/async-storage";

//var email = "null";
// var name = "null";

// const getData = async () => {
//   try {
//     email = await AsyncStorage.getItem("userEmail");
//     name = await AsyncStorage.getItem("userName");
//     if (email != null) {
//       console.log("##emailworking in chats", email);
//     } else {
//       email = "error";
//       console.log("##email not working in chats", email);
//     }
//   } catch (e) {
//     //return isLoggedIn;
//     // error reading value
//   }
// };

export default function Mychats({ navigation, route }) {
  console.log("@@Mychatsnow1", route);
  // useEffect(() => {
  //   getData();
  //   //console.log("##useeffect", isLoggedIn);
  // }, []);

  //getData();
  // email = route.params.email;
  // console.log("@@email in my chats", email);

  const db = firebase.firestore();

  var ref = db
    .collection("Personal")
    .doc(route.params.email)
    .collection(route.params.email)
    .orderBy("lastActive", "desc");

  // var user = firebase.auth().currentUser;
  // var name, email;

  // if (user != null) {
  //   name = user.displayName;
  //   email = user.email;
  // } else {
  //   email = "error";
  // }
  // console.log("##name", name);
  // console.log("##email", email);

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
  }, [route.params.email]);

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
