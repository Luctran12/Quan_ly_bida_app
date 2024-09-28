import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import BookFood from "./components/FoodSource/BookFood";
import TablesScreen from "./components/table_screens/TablesScreen";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Bida") {
              iconName = "billiards";
            } else if (route.name === "Food & Drink") {
              iconName = "food";
            }

            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons name={iconName} size={24} color="black" />
            );
          },
          tabBarActiveTintColor: "#45e143",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Bida" component={TablesScreen} />
        <Tab.Screen name="Food & Drink" component={BookFood} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
});
