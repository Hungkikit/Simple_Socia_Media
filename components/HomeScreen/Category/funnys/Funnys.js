import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Post2 from "../../Posts/postImage";
import Post from "../../Posts/post";
import { URI_GET_DATA_POTS_FUNNYS } from "../../../../UriDataBase";

const Tab = createMaterialTopTabNavigator();
const Funnys = ({ navigation }) => {
  const [Data, setData] = useState([]);
  const [DataPots, setDataPots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPots, setIsLoadingPots] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataPost();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      userLogin();
      getDataPost();
    });

    return unsubscribe;
  }, [navigation]);
  // console.log(Data);

  const userLogin = async () => {
    try {
      const data = await AsyncStorage.getItem("Object");
      if (data != null) {
        setData(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(Data.length);

  const getDataPost = async () => {
    try {
      const res = await fetch(URI_GET_DATA_POTS_FUNNYS);
      const json = await res.json();
      setDataPots(json);
    } catch (error) {
    } finally {
      setIsLoadingPots(false);
      setRefreshing(false);
    }
  };
  // console.log(DataPots);

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 15 }}>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          paddingHorizontal: 10,
          marginBottom: 15,
        }}
      ></View>
      {isLoadingPots ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          id={DataPots.id}
          data={DataPots}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) =>
            item.image.indexOf("data:image/jpeg;base64,") > -1 ||
            item.image.indexOf("data:image/png;base64,") > -1 ? (
              <Post
                name={item.user.name}
                description={item.image}
                image={item.user.avata}
                potId={item.id}
                content={item.content}
                userId={item.user.id}
              />
            ) : (
              <Post2
                name={item.user.name}
                description={item.image}
                image={item.user.avata}
                potId={item.id}
                content={item.content}
                userId={item.user.id}
              />
            )
          }
        />
      )}
    </View>
  );
};

export default Funnys;
