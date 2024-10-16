import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { LinearGradient } from 'expo-linear-gradient'; // Sử dụng gradient nền

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={['#ffffff', '#B5FFFC']}
          style={styles.gradientBackground}
        >
          <View style={styles.top}>
            <Image
              style={styles.logo}
              source={require("../../assets/LoGo.png")}
            />
            <Text style={styles.textTitle}>Welcome Back</Text>
          </View>

          <View style={styles.mid}>
            <View style={styles.userInput}>
              <TextInput
                style={styles.placeholderText}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.userInput}>
              <TextInput
                style={styles.placeholderText}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.buttonMid}>
              <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.text}>Đăng nhập</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <Text style={styles.textForgotPass}>Quên mật khẩu?</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  top: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  mid: {
    width: "100%",
    alignItems: "center",
  },
  userInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  placeholderText: {
    fontSize: 18,
    color: "#333",
  },
  buttonMid: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF6F61",
    borderRadius: 30,
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  textForgotPass: {
    color: "#FF6F61",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
