import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import { Input } from "react-native-elements";
import * as firebase from "firebase";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("AppDB");

export default function LoginPage({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateCurrentEmail = () => {
    var query = "UPDATE users SET isLogged=? WHERE email=?";
    var params = [1, email];

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {},
        function (tx, err) {
          Alert.alert("Failed to log in User");
          return;
        }
      );
    });
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          updateCurrentEmail();
          navigation.navigate("Home");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={{ paddingTop: 30, alignItems: "center" }}>
      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(value) => setEmail(value)}
      />

      <View style={{ paddingTop: 10 }} />

      <Input
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(value) => setPassword(value)}
      />

      <Button title="Log In" onPress={onLoginPress} />
      <View style={{ paddingTop: 10 }} />
      <Button title="Create an account" onPress={goToSignUp} />
    </View>
  );
}
