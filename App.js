import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { StyleSheet, Text, View ,Modal} from "react-native";
import Login from "./components/Login_Function/LoginForm";
import UserPage from "./components/User_Page/UserPage";
import ManageEmployeePage from "./components/User_Page/ManageEmployee";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingPage from "./components/User_Page/SettingUser";
import { ModalManage } from "./components/User_Page/ModalofManage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isModalVisible, setIsModalVisible]= useState(false)
  const changeModalVisible=(bool)=>{
    setIsModalVisible(bool)

  }
  return (
    <View style={styles.container}>
      
      {/* <Text>App quan ly bida</Text> */}
     
      {/* <Login/> */}

      {/* <RegisterNewAcc/> */}
      {/* <UserPage/> */}
      <ManageEmployeePage/>

      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={UserPage} />
         
        </Stack.Navigator>
        </NavigationContainer> */}

     {/* <SettingPage/> */}
      
     {/* <Modal
        transparent={true}
        animationType='fade'
        visible={isModalVisible}
        nRequestClose={()=> changeModalVisible(false)}
      >
         
        <ModalManage/>
      </Modal> */}
      <StatusBar style="auto" />
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
