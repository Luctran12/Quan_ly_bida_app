import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput,Image, TouchableOpacity } from "react-native";
import Login from "./LoginForm";

export default function RegisterNewAcc({ onCancel }) {

  return (


    <View style={styles.container}>
      <View style={styles.titleFrame}>
      <Image
                style={styles.logo}
                source={require('../../assets/LoGo.png')}
        />
        <Text style={styles.titleText}>Đăng ký</Text>
      </View>
      
      <View style={styles.inputFrames}>
        <View style={styles.inputFrameEach}>
          <TextInput
            style={styles.TextInput}
            placeholder="tên đăng nhập"
          />
        </View>

        <View style={styles.inputFrameEach}>
          <TextInput
            style={styles.TextInput}
            placeholder="mật khẩu"
          />
        </View>
        <View style={styles.inputFrameEach}>
          <TextInput
            style={styles.TextInput}
            placeholder="nhập lại mật khẩu"
          />
        </View>
      </View>
      





      <Button
        title="thoát"
        onPress={onCancel}

      />
      <StatusBar style="auto" />



    </View>




  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%"
  },
  titleFrame:{
    borderWidth:2,
    marginTop:80
  },
  titleText: {
    fontSize: 40
  },
  logo:{
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  text: {
    
  },
  inputFrames: {
    borderWidth:1,
    width:'70%',
    
  },
  inputFrameEach: {
    width:'100%'
  },
  TextInput: {
    marginLeft: 5
  }

});
