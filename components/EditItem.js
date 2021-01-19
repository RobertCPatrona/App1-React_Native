import React, { useState, useEffect } from "react";
import { View, Button, Alert } from "react-native";
import { Input } from "react-native-elements";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("AppDB");

export default function EditItem({ navigation, route }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    var query = "";
    if (route.params.category === "food") {
      query = "SELECT * FROM food_items WHERE id=?";
    } else if (route.params.category === "house") {
      query = "SELECT * FROM house_items WHERE id=?";
    }
    params = [route.params.id];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          if (results.rows._array.length > 0) {
            setName(results.rows._array[0]["name"]);
            setPrice(results.rows._array[0]["price"]);
          }
        },
        function (tx, err) {
          Alert.alert("Failed to retrieve Item");
          return;
        }
      );
    });
  };

  const editItem = (name, price, id) => {
    if (name === "" || price === null) {
      Alert.alert("One of the fields is empty.");
      return;
    }

    var query = "";
    if (route.params.category === "food") {
      query = "UPDATE food_items SET name=?, price=? WHERE id=?";
    } else if (route.params.category === "house") {
      query = "UPDATE house_items SET name=?, price=? WHERE id=?";
    }
    var params = [name, price, id];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          Alert.alert("Success, Item edited");
          if (route.params.category === "food") {
            navigation.navigate("FoodItems");
            route.params.getData();
          } else if (route.params.category === "house") {
            navigation.navigate("HouseItems");
            route.params.getData();
          }
        },
        function (tx, err) {
          Alert.alert("Failed to edit Item");
          return;
        }
      );
    });
  };

  return (
    <View style={{ paddingTop: 30, alignItems: "center" }}>
      <Input
        placeholder="Name"
        defaultValue={name}
        onChangeText={(value) => setName(value)}
      />

      <View style={{ paddingTop: 10 }} />

      <Input
        placeholder="Price"
        defaultValue={price.toString()}
        onChangeText={(value) => setPrice(value)}
      />

      <Button
        title="Edit Item"
        onPress={() => editItem(name, price, route.params.id)}
      />
    </View>
  );
}
