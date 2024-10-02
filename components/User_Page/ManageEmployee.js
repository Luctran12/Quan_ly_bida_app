import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert ,Modal} from 'react-native';
import axios from 'axios';
import { ModalManage } from './ModalofManage';
const EmployeeForm = () => {
  const [fullName, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible]= useState(true)
  const [chooseData,setChooseData]=useState()
  const changeModalVisible=(bool)=>{
    setIsModalVisible(bool)

  }
  const setData=(data)=>{
    setChooseData(data)
  }

//   const handleAddEmployee = () => {
//     // Xử lý thêm nhân viên ở đây
//     console.log("Thêm nhân viên:", { name, username, password });
//   };

  const handleDeleteEmployee = () => {
    // Xử lý xóa nhân viên ở đây
    console.log("Xóa nhân viên:", { fullName, userName });
  };
  const handleCreateUser = async () => {
    console.log('Đang gọi API để tạo người dùng...'); // Kiểm tra
    try {
      const response = await axios.post('https://quan-ly-bida-backend.onrender.com/user/create', {
        userName,
        password,
        fullName,
      });
  
      console.log('Phản hồi từ API:', response.data); 
  
      
      if (response.data.code === 0) {
       
        Alert.alert('Thông báo', response.data.msg);
        console.log('success')
      } else {
        
        Alert.alert('Thông báo', 'Có lỗi xảy ra khi tạo người dùng.');
        console.log('success 2')
      }
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi tạo người dùng.');
    }
  };
  

  return (
    <View style={styles.container}>
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
        value={userName}
        onChangeText={setUserName}
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
        <Button title="Thêm nhân viên" onPress={handleCreateUser} />
        <Button title="Xóa nhân viên" onPress={handleDeleteEmployee} color="red" />

      </View>
      <Modal
        transparent={true}
        animationType='fade'
        visible={isModalVisible}
        nRequestClose={()=> changeModalVisible(false)}
      >
      
         <ModalManage
          changeModalVisible={changeModalVisible}
          setData={setData}
         />
      </Modal>
    </View>
  );
};

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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView:{
    backgroundColor:'red',
    height:500,
    width:600,

  }
});

export default EmployeeForm;
