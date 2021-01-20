import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import { Input } from "react-native-elements";
import * as firebase from "firebase";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("AppDB");

export default function SignUpPage({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const addToDB = () => {
    var params;

    if (email.toString().toLowerCase() === "admin@gmail.com") {
      params = [email, 1, 1];
    } else {
      params = [email, 1, 0];
    }

    var query =
      "INSERT INTO users (id,email,isLogged,isAdmin) VALUES (null,?,?,?)";

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          Alert.alert("Success, User added");
        },
        function (tx, err) {
          Alert.alert(err.message);
          return;
        }
      );
    });
  };

  const onSignUpPress = () => {
    if (password !== passConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          addToDB();
          navigation.navigate("Home");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  const goToLogin = () => {
    navigation.navigate("Login");
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

      <View style={{ paddingTop: 10 }} />

      <Input
        placeholder="Confirm Password"
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(value) => setPassConfirm(value)}
      />

      <Button title="Sign Up" onPress={onSignUpPress} />
      <View style={{ paddingTop: 10 }} />
      <Button title="Go to Log In" onPress={goToLogin} />
    </View>
  );
}
