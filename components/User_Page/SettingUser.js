import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSetting } from './contextAPI/SettingContext';
const SettingPage = (navigation) => {
  const [username, setUsername] = useState('Nhập tên mới');
  const [password, setPassword] = useState('******');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const {setName, setSex, name}= useSetting();

  const avatars = {
    male: require('../../assets/headerAvata.png'), // Đường dẫn đến ảnh nam
    female: require('../../assets/FemaleAvata.png'), // Đường dẫn đến ảnh nữ
  };

  const handleSaveChanges = () => {
    // Lưu thông tin người dùng
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Selected Avatar:', selectedAvatar);
    alert('Thông tin đã được lưu!');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài Đặt Tài Khoản</Text>
      
      {/* Avatar Section */}
      <Text style={styles.label}>Chọn ảnh đại diện:</Text>
      <View style={styles.avatarContainer}>
        {/* <TouchableOpacity onPress={() => setSelectedAvatar(avatars.male)}> */}
       <TouchableOpacity onPress={() => {setSelectedAvatar(avatars.male); setSex('male');}}>
          <Image source={avatars.male} style={[styles.avatar, selectedAvatar === avatars.male && styles.selected]} />
          <Text>Nam</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => setSelectedAvatar(avatars.female)}> */}
        <TouchableOpacity onPress={() => {setSelectedAvatar(avatars.female); setSex('female');}}>
          
          <Image source={avatars.female} style={[styles.avatar, selectedAvatar === avatars.female && styles.selected]} />
          <Text>Nữ</Text>
        </TouchableOpacity>
      </View>

      {/* Username Section */}
      <Text style={styles.label}>Tên người dùng:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => {
        setUsername(text);
        setName(text); // Cập nhật name trong context
      }}
/>

      {/* Password Section */}
      <Text style={styles.label}>Mật khẩu:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Save Button */}
      <Button title="Lưu thay đổi" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#007bff',
  },
});

export default SettingPage;
