import React from "react";
import { FlatList,Text, SafeAreaView,StyleSheet, View } from "react-native";
import TableData from "./TableData";
import AdminTable from "./AdminTable";


export default function TableStatusScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Trạng thái bàn</Text>
      <FlatList
        data={TableData}
        keyExtractor={(item) => item.id.toString()}
        
        renderItem={({ item }) => (
          <AdminTable
            id={item.id}
            type={item.type}
            cost={item.cost}
            status={item.status} 
          />
        )}
      />
    </SafeAreaView>
  );
}
const styles= StyleSheet.create({
    container: {
        padding:20,
        marginLeft: 20,
        alignItems: "center"
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
    }
})