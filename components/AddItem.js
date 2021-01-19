import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import { Input } from "react-native-elements";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("AppDB");

export default function AddItem({ navigation, route }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);

  const addItem = (name, price) => {
    if (name === "" || price === null) {
      Alert.alert("One of the fields is empty.");
      return;
    }

    var query = "";
    if (route.params.category === "food") {
      query = "INSERT INTO food_items (id,name,price) VALUES (null,?,?)";
    } else if (route.params.category === "house") {
      query = "INSERT INTO house_items (id,name,price) VALUES (null,?,?)";
    }
    var params = [name, price];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          Alert.alert("Success, Item added");
          if (route.params.category === "food") {
            navigation.navigate("FoodItems");
            route.params.getData();
          } else if (route.params.category === "house") {
            navigation.navigate("HouseItems");
            route.params.getData();
          }
        },
        function (tx, err) {
          Alert.alert("Failed to add Item");
          return;
        }
      );
    });
  };

  return (
    <View style={{ paddingTop: 30, alignItems: "center" }}>
      <Input placeholder="Name" onChangeText={(value) => setName(value)} />

      <View style={{ paddingTop: 10 }} />

      <Input placeholder="Price" onChangeText={(value) => setPrice(value)} />

      <Button title="Add Item" onPress={() => addItem(name, price)} />
    </View>
  );
}
