import PouchDB from 'pouchdb-react-native';
import AsyncStorageAdapter from 'pouchdb-adapter-asyncstorage';
import { Alert } from "react-native";
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

const SQLiteAdapter = SQLiteAdapterFactory(PouchDB);
PouchDB.plugin(SQLiteAdapter);

const db = new PouchDB('my_database', { adapter: 'react-native-sqlite' });

export default function useSolveData() {
  const saveFoodData = async (nameFood, cost, quantity, table) => {
    const foodDoc = {
      _id: new Date().toISOString(),  // ID dựa trên thời gian
      name: nameFood,
      quantity: quantity,
      table: table,
      cost: cost,
    };

    try {
      await db.put(foodDoc);
      Alert.alert('Thành công', 'Dữ liệu đã được lưu!');
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu.');
    }
  };

  return { saveFoodData };
}
