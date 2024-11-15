import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DoanhThuColumn from "./DoanhThuColumn";
import ManageEmployee from "./ManageEmployee";
import SettingUser from "./SettingUser";
const Stack = createNativeStackNavigator();
export default function Test({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="AdminHome">
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdminHome"
        component={AdminHome}
      />
      <Stack.Screen
        //options={{ headerShown: false }}
        name="ManagePage"
        component={ManageEmployee}
      />
      <Stack.Screen
        //options={{ headerShown: false }}
        name="Settings"
        component={SettingUser}
      />
      <Stack.Screen
        //options={{ headerShown: false }}
        name="Revenue"
        component={DoanhThuColumn}
      />
      {/* <Stack.Screen name="Settings" component={SettingUser} />  */}
    </Stack.Navigator>
  );
}
function AdminHome({ navigation }) {
  var x = "hello";
  {
    console.log(x);
  }
  return (
    // <Tab.Navigator>

    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <Text style={styles.headerTitle}>CHỦ QUÁN</Text>
          <Text style={styles.headerText}>Nguyen Van A</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            height: 120,
            width: 120,
            justifyContent: "center",
            alignItems: "center",
            //borderRadius: "50%",
            backgroundColor: "gray",
          }}
        >
          <View style={styles.headerSide}>
            <Image
              source={require("../../assets/headerAvata.png")}
              style={styles.headerAvata}
            />
          </View>
        </View>
      </View>
    </View>
    // </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7bc0b9",
    padding: 20,
    height: "100%",
    width: "100%",
  },
  header: {
    marginTop: 50,
    alignItems: "center",
    //justifyContent: "space-between",
    marginBottom: 60,
    flexDirection: "row",
    //backgroundColor: "#71ebdf",
  },
  headerSide: {
    flex: 1,
    alignItems: "center",
    // borderWidth:2,
    // borderColor:'red',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  headerText: {
    fontSize: 20,
    color: "#666",
    marginBottom: 10,
  },
  headerAvata: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    //backgroundColor: "gray",
  },
  gridContainerFistRow: {
    //borderWidth: 2,
    //borderColor: "black"
    flexDirection: "row",
    //flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridContainerSecondRow: {
    //borderWidth: 2,
    //borderColor: "black"
    flexDirection: "row",
    //flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridItems: {
    height: 190,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 40,
    backgroundColor: "white",
    borderRadius: 20,
    //marginTop: 30,
    // elevation: 10,
  },
});
