import {
  StyleSheet,
  View,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import Style from "./styleRegister";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { URI } from "../../UriDataBase";

const   Register = ({ navigation }) => {
  const [Quyen, setQuyen] = useState("user");
  const [username, setusername] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [avatar, setavatar] = useState("");
  const [Loading, setLoading] = useState(false);

  const getDataEmail = (url) => {
    fetch(url + "?username=" + username)
      .then((res) => res.json())
      .then(async (Data) => {
        console.log(Data);
        if (Data.length === 1) {
          Alert.alert("Thông báo", "tai khoan đã được đăng kí !", [
            { text: "OK", style: "cancel" },
          ]);
          return;
        } else {
          const User = {
            name: Name,
            username: username,
            password: Password,
            quyen: Quyen,
            avata: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            follower: 0,
          };
          const url = URI;
          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(User),
          })
            .then((res) => {
              if (res.status === 201) {
                Alert.alert("Thông báo", "Đăng Kí tài khoản thành công", [
                  { text: "OK", style: "cancel" },
                ]);
                setusername("");
                setEmail("");
                setPassword("");
                setRePassword("");
                navigation.goBack();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => console.log(error));
  };
  const Register = async () => {
    if (Name === "" || username === "" || Password === "" || RePassword === "") {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ các thông tin", [
        { text: "OK", style: "cancel" },
      ]);
      return;
    } else {
      if (Password !== RePassword) {
        Alert.alert("Thông báo", "Mật khẩu nhập lại không chính xác !", [
          { text: "OK", style: "cancel" },
        ]);
        return;
      } else {
        getDataEmail(URI)
      }
    }
  };
  const data = [
    { label: "ADMIN", value: "admin" },
    { label: "USER", value: "user" },
  ];

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
            onChangeText={(text) => setName(text)}
            style={styles.box_input1}
            placeholder="Name "
          ></TextInput>
        </View>
        <View style={styles.box_input}>
          <Image
            style={styles.imageicon}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/017/608/909/small/e-mail-icon-mail-envelope-service-contact-message-sending-send-email-icon-e-mail-address-vector.jpg",
            }}
          />
          <TextInput
            onChangeText={(text) => setusername(text)}
            style={styles.box_input1}
            placeholder="User Name "
          ></TextInput>
        </View>
        <View style={styles.box_input}>
          <Image
            style={styles.imageicon}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/017/608/909/small/e-mail-icon-mail-envelope-service-contact-message-sending-send-email-icon-e-mail-address-vector.jpg",
            }}
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            style={styles.box_input1}
            secureTextEntry={true}
            placeholder="Password"
          ></TextInput>
        </View>
        <View style={styles.box_input}>
          <Image
            style={styles.imageicon}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/017/608/909/small/e-mail-icon-mail-envelope-service-contact-message-sending-send-email-icon-e-mail-address-vector.jpg",
            }}
          />
          <TextInput
            onChangeText={(text) => setRePassword(text)}
            style={styles.box_input1}
            secureTextEntry={true}
            placeholder="RePassword"
          ></TextInput>
        </View>
        <View style={styles.box_input}>
          <Image
            style={styles.imageicon}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/017/608/909/small/e-mail-icon-mail-envelope-service-contact-message-sending-send-email-icon-e-mail-address-vector.jpg",
            }}
          />
          <TextInput
            onChangeText={(text) => setavatar(text)}
            style={styles.box_input1}
            placeholder="Link anh "
          ></TextInput>
        </View>
        <View style={{ marginTop: 40 }}>
          <Dropdown
            style={Style.dropdown}
            placeholderStyle={Style.placeholderStyle}
            selectedTextStyle={Style.selectedTextStyle}
            iconStyle={Style.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Chọn Quyền"
            value={Quyen}
            onChange={(item) => {
              setQuyen(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={Style.icon}
                color="white"
                name="Safety"
                size={20}
              />
            )}
          />
          {Loading ? (
            <TouchableOpacity style={styles.city} onPress={Register}>
              <Text style={styles.login}>Sign Up</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.city} onPress={Register}>
              <Text style={styles.login}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.view7}>
        <Text>
          You have account? Let's{" "}
          <Text
            style={{ color: "#33CCFF" }}
            onPress={() => navigation.navigate("Login")}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  view_login: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageicon: {
    width: 50,
    height: 40,
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
    marginBottom: 10,
  },
  login: {
    color: "white",
  },
  image1: {
    width: 250,
    height: 240,
    marginBottom: 100,
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
});

export default Register;
