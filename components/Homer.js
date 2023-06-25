import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";

const Home = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.BaiViet}>
          <View TouchableOpacity style={styles.View_Taikhoan}>
           < TouchableOpacity>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("./img/taikhoan.png")}
            />
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {" "}
                Pham hung
              </Text>
              <Text style={{ marginLeft: 10 }}>1 hour</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image
              style={{ width: 35, height: 37, marginLeft: 200 }}
              source={require("./img/Follow.png")}
            />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
          <View style={styles.baiviet}>
            <Text style={{ marginBottom: 10, padding: 10 }}>
              A simple tab bar on the bottom of the screen that lets you switch
              between different routes. Routes are lazily initialized -- their
              screen components are not mounted until they are first focused.
            </Text>
            <Image
              style={{ width: 410, height: 300, padding: 10, marginLeft: 10 }}
              source={require("./img/anhAnh.jpg")}
            />
          </View>
          </TouchableOpacity>
          <View style={styles.thanhcongvu}>
            <TouchableOpacity>
            <View style={styles.like}>
              <Image
                style={{ width: 35, height: 37, marginLeft: 11 }}
                source={require("./img/tim1.jpg")}
              />
              <Text style={{ fontSize: 20, marginTop: 5 }}>Like</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.Comments}>
              <Image
                style={{ width: 24, height: 27, marginLeft: 20 }}
                source={require("./img/commens.png")}
              />
              
              <Text style={{ fontSize: 20, marginLeft: 5 }}>Comment</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.Share}>
              <Image
                style={{ width: 30, height: 33, marginLeft: 20 }}
                source={require("./img/Share.png")}
              />
              <Text style={{ fontSize: 20, marginTop: 2, marginLeft: 3 }}>
                Share
              </Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Add");
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "red",
          position: "absolute",
          bottom: 20,
          right: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={require("./img/add.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  View_Taikhoan: {
    marginLeft: 10,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  thanhcongvu: {
    flexDirection: "row",
  },
  like: {
    flexDirection: "row",
  },
  Comments: {
    flexDirection: "row",
    marginLeft: 50,
    marginTop: 5,
  },
  Share: {
    flexDirection: "row",
    marginLeft: 40,
    marginTop: 3,
  },
});
