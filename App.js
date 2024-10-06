import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "./components/Login_Function/firebaseConfig.js";
import Login from "./components/Login_Function/LoginForm";
import RegisterScreen from "./components/Login_Function/RegisterForm";
import HomePage from "./components/User_Page/HomePage";
import { Provider } from "./components/User_Page/Context.js";
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
    <Provider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* {user ? ( */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomePage}
        />
        {/* ) : ( */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        {/* )} */}

        <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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
