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

export default function FoodItems({ navigation }) {
  const [foodItems, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    var query = "SELECT * FROM users";

    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (tx, results) => {
          if (results.rows._array.length > 0) {
            setUsers(results.rows._array);
          }
        },
        function (tx, err) {
          Alert.alert("Failed to initialize DB");
          return;
        }
      );
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Email - {item.email}</Text>
      <Text style={styles.title}>Is Logged In - {item.isLogged}</Text>
      <Text style={styles.title}>Is Admin - {item.isAdmin}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#bfffb5",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
