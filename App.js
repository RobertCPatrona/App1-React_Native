import "react-native-gesture-handler";
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import mainPage from "./components/mainPage.js";
import HouseItems from "./components/HouseItems.js";
import FoodItems from "./components/FoodItems.js";
import LoginPage from "./components/Auth/LoginPage.js";
import SignupPage from "./components/Auth/SignupPage.js";
import Users from "./components/Auth/Users.js";
import AddItem from "./components/AddItem.js";
import EditItem from "./components/EditItem.js";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={mainPage}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "Log In" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupPage}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="HouseItems"
          component={HouseItems}
          options={{ title: "House Items" }}
        />
        <Stack.Screen
          name="FoodItems"
          component={FoodItems}
          options={{ title: "Food Items" }}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{ title: "Add a new Item" }}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{ title: "Edit an Item" }}
        />
        <Stack.Screen
          name="Users"
          component={Users}
          options={{ title: "List of Users" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
