import { StyleSheet,  FlatList, Text, View, ActivityIndicator,
  RefreshControl, } from "react-native";
import React from "react";
import { useState ,useEffect, useCallback} from "react";
import Post from "../../Posts/post";
import Post2 from "../../Posts/postImage";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {URI_GET_DATA_POTS_NEWS} from "../../../../UriDataBase";
const News = ({ navigation }) => {
  const [DataPots, setDataPots] = useState([]);
  const [isLoadingPots, setIsLoadingPots] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dataCmt, setdataCmt] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataPost();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataPost();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataPost = async () => {
    try {
      const res = await fetch( URI_GET_DATA_POTS_NEWS);
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
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
        }}></View>
      {isLoadingPots ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          id={DataPots.id}
          data={DataPots}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) =>
            item.image.indexOf('data:image/jpeg;base64,') > -1 ||
            item.image.indexOf('data:image/png;base64,') > -1 ? (
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

export default News;
