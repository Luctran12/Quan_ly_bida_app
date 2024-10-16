import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useSetting } from './contextAPI/SettingContext';
import { LinearGradient } from 'expo-linear-gradient'; // Expo Linear Gradient

const SettingPage = (navigation) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { setName, setSex } = useSetting();

  const avatars = {
    male: require('../../assets/headerAvata.png'),
    female: require('../../assets/FemaleAvata.png'),
  };

  const handleSaveChanges = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Selected Avatar:', selectedAvatar);
    alert('Thông tin đã được lưu!');
  };

  return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>Cài Đặt Tài Khoản</Text> */}

        {/* Avatar Section */}
        <Text style={styles.label}>Chọn ảnh đại diện:</Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedAvatar(avatars.male);
              setSex('male');
            }}
            style={styles.avatarWrapper}
          >
            <Image source={avatars.male} style={[styles.avatar, selectedAvatar === avatars.male && styles.selected]} />
            <Text style={styles.avatarLabel}>Nam</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedAvatar(avatars.female);
              setSex('female');
            }}
            style={styles.avatarWrapper}
          >
            <Image
              source={avatars.female}
              style={[styles.avatar, selectedAvatar === avatars.female && styles.selected]}
            />
            <Text style={styles.avatarLabel}>Nữ</Text>
          </TouchableOpacity>
        </View>
            
        {/* Username Section */}
        <Text style={styles.label}>Tên người dùng:</Text>
        <TextInput
          placeholder='Nhập tên mới'
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
          placeholder='******'
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Lưu Thay Đổi</Text>
        </TouchableOpacity>
      </View>
      
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    padding: 20,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 10,

    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 10,
    fontSize: 16,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 30,
    width: '100%',
  },
  avatarWrapper: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 10,
  },
  selected: {
    borderColor: '#007bff',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  avatarLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SettingPage;
