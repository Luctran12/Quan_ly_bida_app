import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from 'expo-linear-gradient'; 
import { Ionicons } from '@expo/vector-icons'; 
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
import EditTable from "./EditTable";
const Stack = createNativeStackNavigator();

const imageMap = {
  male: require("../../assets/headerAvata.png"),
  female: require("../../assets/FemaleAvata.png"),
};

export default function HomePage({ navigation }) {
  const [nameHome, setNameHome] = useState();

  return (
    <Stack.Navigator initialRouteName="AdminHome">
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdminHome"
        component={AdminHome}
      />
      <Stack.Screen
        name="ManagePage"
        component={ManageEmployee}
      />
      <Stack.Screen
        name="Settings"
        component={SettingUser}
      />
      <Stack.Screen
        name="Revenue"
        component={DoanhThuColumn}
      />
      <Stack.Screen
        name="Table"
        component={TableManagementScreen} // Màn hình chọn quản lý bàn
      />
      <Stack.Screen
      options={{headerShown:false}}
        name="HomeScreen"
        component={HomeScreen} // Màn hình HomeScreen
      />
      <Stack.Screen
      options={{headerShown:false}}
        name="EditTable"
        component={EditTable}/>
    </Stack.Navigator>
  );
}

function AdminHome({ navigation }) {
  const { name, sex } = useSetting();

  return (
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
            backgroundColor: "gray",
          }}
        >
          <View style={styles.headerSide}>
            <Image
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
            navigation.navigate("Table") 
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
  );
}

function TableManagementScreen({ navigation }) {
  return (
    <LinearGradient colors={['#f0f8ff', '#ffffff']} style={styles.tableMange}>
      <View style={styles.header}>
        <Text style={styles.headerTableManage}>Quản Lý Bàn</Text>
      </View>

      <TouchableOpacity
        style={styles.buttonManage}
        onPress={() => navigation.navigate("HomeScreen", { isOwner: true })}
      >
        <Ionicons name="clipboard-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Quản Lý Bàn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonEditTable}
        onPress={() => navigation.navigate("EditTable")}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Thêm/Xoá Bàn</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Hãy chọn một chức năng để bắt đầu</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f5fa", 
    padding: 20,
    height: "100%",
    width: "100%",
  },
  header: {
    marginTop: 50,
    alignItems: "center",
    marginBottom: 60,
    flexDirection: "row",
  },
  headerSide: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2e86ab", // Màu chữ xanh đồng bộ
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
  },
  gridContainerFistRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20, 
    marginTop:20,
  },
  gridContainerSecondRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  gridItems: {
    height: 170,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  tableMange: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  headerTableManage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonManage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e90ff',  
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonEditTable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32cd32',  
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
});
