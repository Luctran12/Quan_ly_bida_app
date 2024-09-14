import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import TablesScreen from "./components/table_screens/TablesScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <Header title="App quan li bida" />

      <View style={styles.body}>
        <TablesScreen />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  body: {
    flex: 1,
    marginTop: 10,
  },
});
