import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FIREBASE_AUTH } from "../Login_Function/firebaseConfig";
import { FIRESTORE_DB } from "../Login_Function/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
export default function ManageEmployee({ navigation }) {
  const auth = FIREBASE_AUTH;
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  // const [isModalVisible, setIsModalVisible] = useState(true);
  // const [chooseData, setChooseData] = useState();
  const [settingVisible, setSettingVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setSettingVisible(bool);
  };
  // const setData = (data) => {
  //   setChooseData(data);
  // };
  //code cua gia dai
  // Function to get the list of employees from Firestore
  const getAllEmployeeNames = async () => {
    try {
      const emailsCollectionRef = collection(FIRESTORE_DB, "emails");
      const querySnapshot = await getDocs(emailsCollectionRef);
      const employees = querySnapshot.docs.map((doc) => doc.data().name); // Extract "name" field
      setEmployeeList(employees); // Set employee names to state
    } catch (error) {
      console.error("Error fetching employee names:", error);
    }
  };

  useEffect(() => {
    getAllEmployeeNames(); // Fetch employee names when the component mounts
  }, []);
  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(FIRESTORE_DB, "emails", response.user.uid), {
        email: email,
        name: fullName,
      });
      console.log(response);
      alert("Success create account");
      getAllEmployeeNames();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleDeleteEmployee = () => {
    // Xử lý xóa nhân viên ở đây
    //console.log("Xóa nhân viên:", { fullName, userName });
  };

  return (
    <View>
      <Text style={{ fontSize: 19, alignSelf: "center" }}>
        Danh sách nhân viên
      </Text>
      {/* display employee list in FlatList */}
      <FlatList
        data={employeeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.employeeName}>{item}</Text> // Display each name
        )}
      />
      <Button
        title="Chỉnh sửa nhân viên"
        onPress={() => changeModalVisible(true)}
      />
      <Modal visible={settingVisible}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => changeModalVisible(false)}
          >
            <AntDesign name="back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.label}>Tên nhân viên:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên"
            value={fullName}
            onChangeText={setName}
          />

          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập username"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <Button title="Thêm nhân viên" onPress={() => signUp()} />
            <Button
              title="Xóa nhân viên"
              onPress={handleDeleteEmployee}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalView: {
    backgroundColor: "red",
    height: 500,
    width: 600,
  },
  employeeName: {
    fontSize: 16,
    padding: 5,
  },
});
