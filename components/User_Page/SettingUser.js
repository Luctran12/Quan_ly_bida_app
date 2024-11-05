import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { useSetting } from "./contextAPI/SettingContext";

const SettingPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankError, setBankError] = useState(false);
  const { setName, setSex } = useSetting();
  const [acqId, setAcqId] = useState(); // New state for acquirer ID

  const validBanks = [
    "sacombank",
    "vietcombank",
    "mbbank",
    "vietinbank",
    "techcombank",
  ];

  const avatars = {
    male: require("../../assets/headerAvata.png"),
    female: require("../../assets/FemaleAvata.png"),
  };

  const handleSaveChanges = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Selected Avatar:", selectedAvatar);
    alert("Thông tin đã được lưu!");
  };

  const handleGenerateQR = () => {
    // Set acquirer ID based on bank name
    let id = 0;
    switch (bankName) {
      case "sacombank":
        id = 970403;
        break;
      case "vietcombank":
        id = 970436;
        break;
      case "mbbank":
        id = 970422;
        break;
      case "vietinbank":
        id = 970415;
        break;
      case "techcombank":
        id = 970407;
        break;
      default:
        setBankError(true); // Show error if bank name is invalid
        return;
    }

    navigation.navigate("CreateQR", {
      accountNo: accountNumber,
      accountName: accountName,
      acqId: id, // Use the ID that corresponds to the selected bank
    });

    setAcqId(id); // Set acqId state with the corresponding ID
    setQrModalVisible(false); // Close the modal
    // console.log("Account Number:", accountNumber);
    // console.log("Account Name:", accountName);
    // console.log("Bank Name:", bankName);
    // alert("QR Code created!");
    // setQrModalVisible(false);
    // setAcqId(id); // Set acqId state with the corresponding ID
  };

  const validateBankName = (text) => {
    const lowerCaseText = text.toLowerCase(); // Convert to lowercase
    setBankName(lowerCaseText);
    setBankError(!validBanks.includes(lowerCaseText));
  };

  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <Text style={styles.label}>Chọn ảnh đại diện:</Text>
      <View style={styles.avatarContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedAvatar(avatars.male);
            setSex("male");
          }}
          style={styles.avatarWrapper}
        >
          <Image
            source={avatars.male}
            style={[
              styles.avatar,
              selectedAvatar === avatars.male && styles.selected,
            ]}
          />
          <Text style={styles.avatarLabel}>Nam</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedAvatar(avatars.female);
            setSex("female");
          }}
          style={styles.avatarWrapper}
        >
          <Image
            source={avatars.female}
            style={[
              styles.avatar,
              selectedAvatar === avatars.female && styles.selected,
            ]}
          />
          <Text style={styles.avatarLabel}>Nữ</Text>
        </TouchableOpacity>
      </View>

      {/* Username Section */}
      <Text style={styles.label}>Tên người dùng:</Text>
      <TextInput
        placeholder="Nhập tên mới"
        style={styles.input}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setName(text);
        }}
      />

      {/* Password Section */}
      <Text style={styles.label}>Mật khẩu:</Text>
      <TextInput
        placeholder="******"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Save Button */}
      <TouchableOpacity
        style={styles.qrButton}
        onPress={() => setQrModalVisible(true)}
      >
        <Text style={styles.qrButtonText}>Cài Đặt thông tin QR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Lưu Thay Đổi</Text>
      </TouchableOpacity>

      {/* QR Info Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={qrModalVisible}
        onRequestClose={() => setQrModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thông Tin Tài Khoản</Text>
            <TextInput
              placeholder="Số tài khoản"
              style={styles.modalInput}
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
            <TextInput
              placeholder="Tên tài khoản"
              style={styles.modalInput}
              value={accountName}
              onChangeText={setAccountName}
            />
            <TextInput
              placeholder="Tên ngân hàng"
              style={[styles.modalInput, bankError && styles.errorBorder]}
              value={bankName}
              onChangeText={validateBankName}
            />
            {bankError && (
              <Text style={styles.errorText}>Không tìm thấy ngân hàng</Text>
            )}
            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerateQR}
            >
              <Text style={styles.generateButtonText}>Tạo QR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setQrModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    marginVertical: 10,
    fontSize: 16,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 30,
    width: "100%",
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 10,
  },
  selected: {
    borderColor: "#007bff",
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  qrButton: {
    backgroundColor: "#121212",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  qrButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    marginVertical: 10,
    fontSize: 16,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  generateButton: {
    backgroundColor: "#121212",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  closeButtonText: {
    color: "#007bff",
    fontSize: 16,
    marginTop: 15,
  },
});

export default SettingPage;
