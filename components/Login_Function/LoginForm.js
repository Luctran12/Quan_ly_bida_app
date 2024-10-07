import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RegisterNewAcc from "./RegisterForm";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [press, isPress] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate("Home");
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
        {!press ? (
          <>
            <View style={styles.top}>
              <Image
                style={styles.logo}
                source={require("../../assets/LoGo.png")}
              />
              <Text style={styles.textTitle}>Welcome</Text>
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => signIn()}
                >
                  <Text style={styles.text}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.textForgotPass}>Quên mật khẩu</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bot}>
              <View style={styles.buttonBot}>
                <TouchableOpacity
                  style={styles.ButCreateNewAcc}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  <Text style={styles.txtCreateAcc}>Tạo tài khoản</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <RegisterNewAcc onCancel={() => isPress(false)} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eed5b2",
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  top: {
    // borderWidth:2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  textTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  mid: {
    // borderWidth:2,
    width: "90%",
    alignItems: "center",
  },
  userInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderRadius: 20,
    margin: 15,
    paddingVertical: 10,
    borderColor: "#ccc",
  },
  placeholderText: {
    fontSize: 18,
    marginLeft: 20,
  },
  buttonMid: {
    width: "90%",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    width: "100%",
    borderWidth: 2,
    height: 40,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  textForgotPass: {
    color: "black",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  bot: {
    // borderWidth:2,
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },
  buttonBot: {
    width: "80%",
    alignItems: "center",
  },
  ButCreateNewAcc: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
  },
  txtCreateAcc: {
    fontSize: 16,
    color: "white",
  },
});
