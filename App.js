import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
} from "react-native";
import BookFood from "./components/FoodSource/BookFood.js";
import Login from "./components/Login_Function/LoginForm";
import UserPage from "./components/User_Page/UserPage";
import ManageEmployeePage from "./components/User_Page/ManageEmployee";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingPage from "./components/User_Page/SettingUser";
import { ModalManage } from "./components/User_Page/ModalofManage";
import RegisterScreen from "./components/Login_Function/RegisterForm";
import HomePage from "./components/User_Page/HomePage";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./components/Login_Function/firebaseConfig.js";

const Stack = createNativeStackNavigator();
export default function App() {
  const Stack = createNativeStackNavigator();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);
  // const changeModalVisible=(bool)=>{
  //   setIsModalVisible(bool)

  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* {user ? ( */}
        <Stack.Screen name="Home" component={HomePage} />
        {/* ) : ( */}
        <Stack.Screen name="Login" component={Login} />
        {/* )} */}

        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 50,

    // borderWidth:2
  },
});
