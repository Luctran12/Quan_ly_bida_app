import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BookFood from "./components/FoodSource/BookFood.js"
import AdminTable from './components/AdminFunction/AdminTable.js';
import TableStatusScreen from './components/AdminFunction/TableStatusScreen.js';
export default function App(){
  return (
    <View style={styles.container}>
       <TableStatusScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   // backgroundColor: "black"
  },
  
});


