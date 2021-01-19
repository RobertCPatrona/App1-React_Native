import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as firebase from "firebase";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("AppDB");

let config = {
  apiKey: "AIzaSyDOLy2KasKXvYHxvVdz_iyBWTY0LiTkL94",
  authDomain: "app1-297c3.firebaseapp.com",
  databaseURL: "https://app1-297c3.firebaseio.com",
  projectId: "app1-297c3",
  storageBucket: "app1-297c3.appspot.com",
  messagingSenderId: "517805264284",
};

export default function mainPage({ navigation }) {
  const [isAuth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState(0);
  const [doneLoading, setLoading] = useState(false);

  useEffect(() => {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(handleAuthChange);

    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists users (id integer primary key not null, email text, isLogged integer, isAdmin integer)"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists house_items (id integer primary key not null, name text, price integer)"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists food_items (id integer primary key not null, name text, price integer)"
      );
    });
  }, []);

  function handleAuthChange(user) {
    setAuth(!!user);
    getCurrentEmail();
    setLoading(true);
  }

  function getCurrentEmail() {
    var query = "SELECT * FROM users WHERE isLogged=?";
    var params = [1];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          if (results.rows._array.length > 0) {
            setEmail(results.rows._array[0]["email"]);
            if (results.rows._array[0]["isAdmin"] === 1) {
              setAdmin(1);
            }
          }
        },
        function (tx, err) {
          Alert.alert("Failed to initialize DB");
          return;
        }
      );
    });
  }

  function onSignoutPress() {
    var query = "UPDATE users SET isLogged=? WHERE email=?";
    var params = [0, email];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          Alert.alert("Logged out");
        },
        function (tx, err) {
          Alert.alert("Failed to get User");
          return;
        }
      );
    });
    setAdmin(0);
    firebase.auth().signOut();
  }

  return (
    <View>
      {email === "" && !doneLoading && <Text>Loading...</Text>}
      {isAuth ? (
        <View>
          {isAdmin ? (
            <Text>
              You are logged in as
              <Text style={{ fontWeight: "bold" }}> Admin</Text> with email
              <Text style={{ fontWeight: "bold" }}> {email}</Text>
            </Text>
          ) : (
            <Text>
              You are logged in with email
              <Text style={{ fontWeight: "bold" }}> {email}</Text>
            </Text>
          )}
          <View style={{ paddingTop: 5 }} />
          <Text>
            This is the home page. Below are links to pages with lists of house
            and food items.
          </Text>
          <Text>
            Log in as Admin to modify these pages and to see the list of users.
          </Text>
          <View style={{ paddingTop: 10 }} />
          <Button
            title="House Items List"
            onPress={() => navigation.navigate("HouseItems", { email: email })}
          />
          <View style={{ paddingTop: 10 }} />
          <Button
            title="Food Items List"
            onPress={() => navigation.navigate("FoodItems", { email: email })}
          />
          <View style={{ paddingTop: 10 }} />
          {email.toString().toLowerCase() === "admin@gmail.com" && (
            <Button
              title="List of Users"
              onPress={() => navigation.navigate("Users")}
            />
          )}
          <View style={{ paddingTop: 20 }} />
          <Button title="Sign Out" onPress={onSignoutPress} />
        </View>
      ) : (
        <View>
          <Text>
            This is the home page. Log in or Register to see the item list
            pages.
          </Text>
          <View style={{ paddingTop: 10 }} />
          <Button
            onPress={() =>
              navigation.navigate("Login", { getCurrentEmail: getCurrentEmail })
            }
            title="Log In"
          />
          <View style={{ paddingTop: 10 }} />
          <Button
            onPress={() =>
              navigation.navigate("SignUp", {
                getCurrentEmail: getCurrentEmail,
              })
            }
            title="Sign Up"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
