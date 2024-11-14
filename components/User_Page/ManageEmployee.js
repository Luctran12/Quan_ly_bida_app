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
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function ManageEmployee({ navigation }) {
  const auth = FIREBASE_AUTH;
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeEmailList, setEmployeeEmailList] = useState([]);
  const [settingVisible, setSettingVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(FIRESTORE_DB, "emails", response.user.uid), {
        email: email,
        name: fullName,
      });
      Alert.alert("Thông báo", "Thêm nhân viên thành công!");
      getAllEmployeeNames();
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      const emailsCollectionRef = collection(FIRESTORE_DB, "emails");
      const q = query(
        emailsCollectionRef,
        where("email", "==", selectedEmployee.email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(docSnapshot.ref);
        });

        Alert.alert("Thông báo", "Xóa nhân viên thành công!");
        getAllEmployeeNames();
      } else {
        Alert.alert("Thông báo", "Không tìm thấy nhân viên với email đã nhập.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa nhân viên.");
    } finally {
      setConfirmVisible(false);
    }
  };

  const handleEmployeePress = (name, email) => {
    setSelectedEmployee({ name, email });
    setConfirmVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách nhân viên</Text>

      {/* Danh sách nhân viên */}
      <FlatList
        data={employeeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.employeeContainer}
            onPress={() => handleEmployeePress(item, employeeEmailList[index])}
          >
            <Text style={styles.employeeName}>
              {item}: {employeeEmailList[index]}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => changeModalVisible(true)}
      >
        <Text style={styles.buttonText}>Thêm nhân viên</Text>
      </TouchableOpacity>

      {/* Modal for Adding/Editing Employee */}
      <Modal visible={settingVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => changeModalVisible(false)}>
            <AntDesign name="back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalHeader}>Thêm Nhân Viên</Text>

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
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal for Deletion */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.confirmModalContainer}>
          <View style={styles.confirmModalContent}>
            <Text style={styles.confirmText}>Bạn muốn xóa tài khoản này?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleDeleteEmployee}
              >
                <Text style={styles.buttonText}>Có</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={styles.buttonText}>Không</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 20,
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
    width: "40%",
    alignItems: "center",
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
    marginHorizontal: 10,
  },
  confirmModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  confirmModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 16,
    marginBottom: 20,
    // Adds space between the text and buttons
  },
});
