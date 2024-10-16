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
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FIREBASE_AUTH } from "../Login_Function/firebaseConfig";
import { FIRESTORE_DB } from "../Login_Function/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function ManageEmployee({ navigation }) {
  const auth = FIREBASE_AUTH;
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeEmailList, setEmployeeEmailList] = useState([]);
  const [settingVisible, setSettingVisible] = useState(false);

  const changeModalVisible = (bool) => {
    setSettingVisible(bool);
  };

  const getAllEmployeeNames = async () => {
    try {
      const emailsCollectionRef = collection(FIRESTORE_DB, "emails");
      const querySnapshot = await getDocs(emailsCollectionRef);
      const employees = querySnapshot.docs.map((doc) => doc.data().name);
      setEmployeeList(employees);
      const employeesEmail = querySnapshot.docs.map((doc) => doc.data().email);
      setEmployeeEmailList(employeesEmail);
    } catch (error) {
      console.error("Error fetching employee names:", error);
    }
  };

  useEffect(() => {
    getAllEmployeeNames();
  }, []);

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(FIRESTORE_DB, "emails", response.user.uid), {
        email: email,
        name: fullName,
      });
      Alert.alert("Thông báo","Thêm nhân viên thành công!");
      getAllEmployeeNames();
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteEmployee = () => {
    Alert.alert("Thông báo","Xoá nhân viên thành công!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách nhân viên</Text>
      
      {/* Danh sách nhân viên */}
      <FlatList
        data={employeeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.employeeContainer}>
            <Text style={styles.employeeName}>
              {item}: {employeeEmailList[index]}
            </Text>
          </View>
        )}
      />
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => changeModalVisible(true)}
      >
        <Text style={styles.buttonText}>Chỉnh sửa nhân viên</Text>
      </TouchableOpacity>

      <Modal visible={settingVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => changeModalVisible(false)}>
            <AntDesign name="back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalHeader}>Chỉnh sửa nhân viên</Text>

          <TextInput
            style={styles.input}
            placeholder="Tên nhân viên"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={signUp}>
              <Text style={styles.buttonText}>Thêm nhân viên</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteEmployee}>
              <Text style={styles.buttonText}>Xóa nhân viên</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  employeeContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  employeeName: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 20
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
});
