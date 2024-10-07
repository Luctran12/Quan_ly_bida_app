import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./HomePage";
// import SettingPage from "./SettingUser";
// import ManageEmployeePage from "./ManageEmployee";


export default function UserPage (){
   
    return (
        <HomePage/>
        // <NavigationContainer>
        // <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        //   <Stack.Screen name="Home" component={HomePage} />
        //   <Stack.Screen name="Setting" component={SettingPage} />
        //   <Stack.Screen name="Manage" component={ManageEmployeePage} />
        // </Stack.Navigator>
        // </NavigationContainer>
        
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eed5b2',
        padding: 20,
        height:'100%',
        width:'100%'
    },
   
   

})