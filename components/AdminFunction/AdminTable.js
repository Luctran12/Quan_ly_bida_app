import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AdminTable({ id, type, cost, status }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.idTable}>
      <Text style={styles.idText}>Bàn: {id}</Text>
      <Text>Loại: {type}</Text>
      </View>
      <View style={styles.idTable}>
      <Text>Giá: {cost} vnđ/h</Text>
      <Text>Tình trạng: {status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330 ,
    height: 120,
    backgroundColor: "#F0FFFF",
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "green",
    justifyContent: "center",
    //alignItems: "center",
    shadowColor: "lightgreen",
    shadowOpacity: 3,
    shadowOffset: {
        width: 2,
        height: 2
    },
    elevation: 4,
    padding: 16,
  },
  idTable: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  idText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    
  }
});
