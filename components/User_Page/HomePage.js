import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeScreen from "../NhanVienPage/HomeScreen";
import { useSetting } from "./contextAPI/SettingContext";
import DoanhThuColumn from "./DoanhThuColumn";
import ManageEmployee from "./ManageEmployee";
import SettingUser from "./SettingUser";

const Stack = createNativeStackNavigator();

const imageMap = {
  male: require("../../assets/headerAvata.png"),
  female: require("../../assets/FemaleAvata.png"),
};

export default function HomePage({ navigation }) {
  const [nameHome, setNameHome] = useState();

  // const refreshHome= () => {
  //   setNameHome(name);
  // }
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
      <Stack.Screen
        options={{ headerShown: false }}
        name="Table"
        component={HomeScreen}
      />
      <Stack.Screen
        //options={{ headerShown: false }}
        name="ManagePage2"
        component={ManageEmployee}
      />
      {/* <Stack.Screen name="Settings" component={SettingUser} />  */}
    </Stack.Navigator>
  );
}

function AdminHome({ navigation }) {
  const { name, sex } = useSetting();
  console.log("Current data from context:", name + " " + sex);

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
          <Text style={styles.headerText}>{name}</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            height: 120,
            width: 120,
            justifyContent: "center",
            alignItems: "center",
            //borderRadius: "58%",
            backgroundColor: "gray",
          }}
        >
          <View style={styles.headerSide}>
            <Image
              // source={imageMap[sex] || imageMap['male']}
              source={imageMap[sex]}
              style={styles.headerAvata}
            />
          </View>
        </View>
      </View>

      <View style={styles.gridContainerFistRow}>
        <TouchableOpacity
          style={styles.gridItems}
          onPress={() => {
            navigation.navigate("ManagePage");
          }}
        >
          <Octicons
            name="people"
            size={60}
            color="black"
            style={styles.gridIcon}
          />
          <Text> Quản Lý Nhân Viên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItems}
          onPress={() => navigation.navigate("Revenue")}
        >
          <FontAwesome6
            name="sack-dollar"
            size={60}
            color="black"
            style={styles.gridIcon}
          />
          <Text>Doanh Thu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainerSecondRow}>
        <TouchableOpacity
          style={styles.gridItems}
          onPress={() =>
            navigation.navigate("Table", {
              isOwner: true,
            })
          }
        >
          <MaterialCommunityIcons
            name="table-furniture"
            size={60}
            color="black"
            style={styles.gridIcon}
          />
          <Text>Tình Trạng Bàn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItems}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <SimpleLineIcons
            name="settings"
            size={60}
            color="black"
            style={styles.gridIcon}
          />
          <Text>Chỉnh Sửa</Text>
        </TouchableOpacity>
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
