import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./components/Login_Function/LoginForm";

import HomeScreen from "./components/User_Page/UserPage";
export default function App() {
  return (
    <View style={styles.container}>
      
      {/* <Text>App quan ly bida</Text> */}
     
      {/* <Login
       
      /> */}
      {/* <RegisterNewAcc/> */}
      <HomeScreen/>

      

      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 50,

    // borderWidth:2
  },
 
});
