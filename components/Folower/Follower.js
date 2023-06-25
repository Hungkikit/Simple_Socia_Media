import { StyleSheet, Text, View,TouchableOpacity,Image } from "react-native";
import React from "react";
import UserFollow from "./UserFollow/UserFollow";

const Follower = (props) => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, backgroundColor: "silver" }}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{ width: 20, height: 20, marginLeft: 30, marginTop: 20 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/9533/9533047.png",
          }}
        />
      </TouchableOpacity> */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 50,
          paddingBottom: 50,
          paddingTop: 20,
          backgroundColor: "silver",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontWeight: "bold", marginVertical: 15, color: "black" }}
          >
            Người theo dõi
          </Text>
          <UserFollow />
          <UserFollow />
          <UserFollow />
          <UserFollow />
          <UserFollow />
        </View>
      </View>
    </View>
  );
};

export default Follower;

const styles = StyleSheet.create({});
