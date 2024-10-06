import { StyleSheet, Text, View } from "react-native";

export default function DoanhThuColumn() {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>Table</Text>
        <Text style={styles.text}>Date</Text>
        <Text style={styles.text}>OrderId</Text>
        <Text style={styles.text}>Start Time</Text>
        <Text style={styles.text}>End Time</Text>
        <Text style={styles.text}>ToTal</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>1</Text>
        <Text style={styles.text}>27/10/2024</Text>
        <Text style={styles.text}>34</Text>
        <Text style={styles.text}>18:23:20</Text>
        <Text style={styles.text}>20:23:11</Text>
        <Text style={styles.text}>132000</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { marginTop: 80, marginLeft: 20 },
});
