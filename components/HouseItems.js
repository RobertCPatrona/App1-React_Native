import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Button,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("AppDB");

export default function HouseItems({ navigation, route }) {
  const [houseItems, setHouseItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = () => {
    navigation.navigate("AddItem", { category: "house", getData: getData });
  };

  const handleEdit = (id) => {
    navigation.navigate("EditItem", {
      id: id,
      category: "house",
      getData: getData,
    });
  };

  const handleDelete = (id) => {
    var query = "DELETE FROM house_items WHERE id=?";
    var params = [id];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          Alert.alert("Success, Item removed");
          getData();
        },
        function (tx, err) {
          Alert.alert("Failed to remove");
          return;
        }
      );
    });
  };

  const addItem = (name, price) => {
    if (name === "" || price === null) {
      Alert.alert("One of the fields is empty.");
      return;
    }

    var query = "INSERT INTO house_items (id,name,price) VALUES (null,?,?)";
    var params = [name, price];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {},
        function (tx, err) {
          return;
        }
      );
    });
  };

  const getData = () => {
    var query = "SELECT * FROM house_items";

    db.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        if (results.rows._array.length > 0) {
          setHouseItems(results.rows._array);
        } else {
          //Add some default items if the DB is empty
          addItem("Chair", 70);
          addItem("Table", 100);
          addItem("Curtains", 55);
          getData();
        }
      });
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {item.name} - {item.price} {"\u20AC"}
      </Text>
      <View style={{ paddingTop: 5 }} />
      {route.params.email.toString().toLowerCase() === "admin@gmail.com" && (
        <Button
          title="Edit"
          value={item.id}
          onPress={() => handleEdit(item.id)}
        />
      )}
      <View style={{ paddingTop: 5 }} />
      {route.params.email.toString().toLowerCase() === "admin@gmail.com" && (
        <Button
          title="Delete"
          value={item.id}
          onPress={() => handleDelete(item.id)}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ marginBottom: 10, fontSize: 17 }}>
        You are logged in with email
        <Text style={{ fontWeight: "bold" }}> {route.params.email}</Text>
      </Text>
      <FlatList
        data={houseItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {route.params.email.toString().toLowerCase() === "admin@gmail.com" && (
        <Button title="Add Item" onPress={() => handleAdd()} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#d0fdff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
});
