import PouchDB from "pouchdb-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function DataFood(name, price, quantity, table) {
  try {
    const foodData = {
      name: name,
      price: price,
      quantity: quantity,
      table: table,
    };
    const id = new Date().toISOString();
    await AsyncStorage.setItem(id, JSON.stringify(foodData));
    console.log("Data saved successfully");
  } catch (error) {
    console.log("Failed to save data", error);
  }
}
