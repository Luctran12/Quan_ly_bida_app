import React, { useState } from "react";
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

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <ManageEmployeePage/> */}
      {/* <RegisterScreen /> */}
      <Login />
    </View>
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
