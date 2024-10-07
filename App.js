import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { default as React, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { FIREBASE_AUTH } from "./components/Login_Function/firebaseConfig.js";
import Login from "./components/Login_Function/LoginForm.js";
import RegisterScreen from "./components/Login_Function/RegisterForm.js";

import { SettingProvider } from "./components/User_Page/contextAPI/SettingContext.js";
import HomePage from "./components/User_Page/HomePage.js";

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
    // <OrderProvider>
    //   <NavigationContainer>
    //     <Stac.Navigator initialRouteName="UserPage">
    //       <Stac.Screen name="Home" component={HomeScreen} />
    //       <Stac.Screen name="UserPage" component={UserPage} />
    //     </Stac.Navigator>
    //   </NavigationContainer>
    // </OrderProvider>

    <SettingProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomePage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
