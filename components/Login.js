import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { URI } from "../UriDataBase";

const Login = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const Logins = async () => {
    if (username.length == 0) {
      // kiểm tra hợp lệ dữ liệu
      alert("Chưa nhập Username");
      return;
    }
    if (password.length == 0) {
      alert("Chưa nhập Password");
      return; // lệnh return để thoát hàm login
    }
    // thực hiện fetch để lấy dữ liệu về
    fetch(URI + "?/username=" + username + "&" + "password=" + password)
      .then((res) => res.json())
      // kiểm tra kết quả trả về
      .then(async (handle_Login) => {
        if (handle_Login.length !== 1) {
          Alert.alert("Thông báo", "Tài khoản mật khẩu không chính xác", [
            { text: "OK", style: "cancel" },
          ]);
          return;
        } else {
          if (
            handle_Login[0].username === username &&
            handle_Login[0].password === password
          ) {
            try {
              // lưu trữ dữ liệu đăng nhập
              await AsyncStorage.setItem(
                "Object",
                JSON.stringify(handle_Login)
              );

              // chuyển màn hình sang màn hình Tabs
              navigation.navigate("Tabs");
            } catch (error) {
              console.log(error);
            }
          } else {
            Alert.alert("Thông báo", "Đăng nhập thất bại", [
              { text: "OK", style: "cancel" },
            ]);
          }
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.view_login}>
        <View style={styles.back2}>
          <Text style={styles.back}>Hello Again</Text>
          <Text style={styles.back1}>Sign in to your account</Text>
        </View>
        <View style={styles.box_input}>
          <Image
            style={styles.imageicon}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/017/608/909/small/e-mail-icon-mail-envelope-service-contact-message-sending-send-email-icon-e-mail-address-vector.jpg",
            }}
          />
          <TextInput
            style={styles.box_input1}
            placeholder="Email address "
            onChangeText={(text) => setusername(text)}
          ></TextInput>
        </View>
        <View style={styles.box_input}>
          <Image
            style={styles.imageicon}
            source={{
              uri: "https://png.pngtree.com/png-vector/20190917/ourlarge/pngtree-circle-password-icon-vectors-png-image_1738057.jpg",
            }}
          />
          <TextInput
            style={styles.box_input1}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setpassword(text)}
          ></TextInput>
        </View>
      </View>
      <View style={styles.box_view1}>
        <TouchableOpacity>
          <Text style={styles.text1}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.city}
        onPress={() => {
          Logins();
        }}
      >
        <Text style={styles.login}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.with}>
        <Text>----Or login With ?----</Text>
      </View>
      <View style={styles.xh}>
        <TouchableOpacity style={styles.google}>
          <Image
            style={styles.image}
            source={{
              uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.google}>
          <Image
            style={styles.image}
            source={{
              uri: "https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.google}>
          <Image
            style={styles.image}
            source={{
              uri: "https://www.transparentpng.com/thumb/twitter/bird-twitter-socialmedia-icons-png-5.png",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.view7}>
        <Text>
          Don't have account?{" "}
          <Text
            style={{ color: "#33CCFF" }}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image1: {
    width: 250,
    height: 240,
    marginBottom: 100,
  },
  imageicon: {
    width: 50,
    height: 40,
  },
  view_login: {
    alignItems: "center",
    justifyContent: "center",
  },
  box_input: {
    width: 400,
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    marginBottom: 10,
  },
  box_input1: {
    width: 400,
    height: 50,
  },
  box_view1: {
    flexDirection: "row",
    marginBottom: 30,
    marginLeft: 5,
  },
  text1: {
    color: "blue",
    marginLeft: 10,
  },
  city: {
    backgroundColor: "red",
    width: 400,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 40,
    marginLeft: 15,
  },
  login: {
    color: "white",
  },
  xh: {
    marginLeft: 10,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  google: {
    backgroundColor: "white",
    width: 90,
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    resizeMode: "center",
    width: 40,
    height: 40,
  },
  back: {
    fontWeight: "bold",
    color: "red",
    fontSize: 50,
    marginTop: 50,
    marginBottom: 20,
  },
  back1: {
    marginLeft: 25,
    marginBottom: 100,
    fontSize: 20,
  },
  view7: {
    marginTop: 30,
    alignItems: "center",
  },
  with: {
    marginBottom: 10,
    alignItems: "center",
  },
});
