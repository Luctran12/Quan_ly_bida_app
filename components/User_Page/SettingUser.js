import React, { useState, createContext} from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from './HomePage';
import { useSetting } from './Context';
// export const inforContext = createContext()
// Mục tiêu là làm sao khi thay đổi xog thì phải trở về HomePage
// const Stack = createNativeStackNavigator();
// export default  SettingPage =({navigation})=>{
//   return(
//   <Stack.Navigator initialRouteName="SettingNav">
//     <Stack.Screen 
//       options={{ headerShown: false }}
//       name="SettingNav" component={SettingNav}
//     />
//     <Stack.Screen 
//       name="Home" component={HomePage}
//     />

   

//   </Stack.Navigator>
//   );
// }
export default SettingPage = ({navigation}) => {
  const [username, setUsername] = useState('John Doe');
  const [password, setPassword] = useState('******');
  const [selectedAvatar, setSelectedAvatar] = useState('../../assets/headerAvata.png');
  const {setName}= useSetting()
  const avatars = {
    male: '../../assets/headerAvata.png', // Đường dẫn đến ảnh nam
    female: require('../../assets/FemaleAvata.png'), // Đường dẫn đến ảnh nữ
  };

  const handleSaveChanges = () => {
    // Lưu thông tin người dùng
    navigation.navigate("Home")
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
        <TouchableOpacity onPress={() => setSelectedAvatar(avatars.male)}>
          <Image source={require('../../assets/headerAvata.png')} style={[styles.avatar, selectedAvatar === avatars.male && styles.selected]} />
          <Text>Nam</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedAvatar(avatars.female)}>
          <Image source={avatars.female} style={[styles.avatar, selectedAvatar === avatars.female && styles.selected]} />
          <Text>Nữ</Text>
        </TouchableOpacity>
      </View>

      {/* Username Section */}
      <Text style={styles.label}>Tên người dùng:</Text>
      <TextInput
        style={styles.input}
        value={username}
        // onChangeText={setName}
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
      <Button title="Lưu thay đổi" onPress={()=>
        {
          
          // navigation.navigate("AdminHome");
          navigation.goBack();
        }
        } 
        />
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

