import { StyleSheet, Text, View } from "react-native";
export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    borderWidth: 1,
    width: "100%",
    height: "8%",
    backgroundColor: "red",
  },
});
