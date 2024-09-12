import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BookFood from "./components/FoodSource/BookFood.js"
export default function App(){
  return (
    <View style={styles.container}>
       <BookFood/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});


