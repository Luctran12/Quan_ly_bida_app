import React, { useState } from 'react';
import { TextInput, View, Text,Button } from 'react-native';
import { StyleSheet } from 'react-native';


export default function MyComponent() {
  const [username, setUsername] = useState('ggg'); // Khai báo biến state cho username
  const[count, setCount]=useState(1)
    function testing(text){
        setUsername(text=>text+"ffff")
        console.log(text)
    }
    function c(t){
        setCount(count+1)
        console.log(count)
        console.log(t)
    }
  return (
    <View>
      <TextInput
        value={username} // Sử dụng state 'username' làm giá trị của TextInput
        onChangeText={testing} // Cập nhật state khi giá trị thay đổi
        placeholder="Nhập tên người dùng"
      />
      <Text>Tên người dùng: {username}</Text>
      <Button
      title='hggf'
      onPress={c}
    //   onPress={testing}
      />  
      
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
      borderWidth:2
    },
    input:{
        width: 80,
       height: 80,
       marginBottom: 20
    }

})