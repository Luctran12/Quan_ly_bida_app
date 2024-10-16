import { SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DoanhThuColumn from "./DoanhThuColumn";
export default function DoanhThuPage() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <DoanhThuColumn />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
