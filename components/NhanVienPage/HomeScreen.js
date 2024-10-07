import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { OrderProvider } from "../context/OrderContext";
import BookFood from "../FoodSource/BookFood";
import TablesScreen from "../table_screens/TablesScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <OrderProvider>
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
    </OrderProvider>
  );
}
