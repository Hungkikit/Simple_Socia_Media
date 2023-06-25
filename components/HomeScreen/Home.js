import { StyleSheet, Text, View } from 'react-native'
import News from './Category/news/News';
import Funnys from './Category/funnys/Funnys';
import React, { useState,useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({navigation}) => {
  const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
const Tab = createMaterialTopTabNavigator();

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    userLogin();
  });

  return unsubscribe;
}, [navigation]);
const userLogin = async () => {
  try {
    const data = await AsyncStorage.getItem('Object');
    if (data != null) {
      setData(JSON.parse(data));
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}> 
     {isLoading ? (
        <View></View>
      ) : Data[0].quyen === 'admin' ? (
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              marginTop: 20,
              width: '100%',
              height: 50,
              borderWidth: 1,
              borderColor: 'silver',
              lineHeight: 48,
              paddingLeft: 10,
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('Status')}>
            Đăng trạng thái của bạn...
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      <Tab.Navigator
        initialRouteName="News"
        screenOptions={{
          tabBarStyle: {
            width: 220,
            marginLeft: '23%',
            backgroundColor: 'transparent',
            elevation: 0,
            marginBottom: 10,
          },
          swipeEnabled: false,
          tabBarIndicatorStyle: {
            width: 70,
            marginLeft: 20,
            backgroundColor: 'black',
          },
        }}>
        <Tab.Screen name="News" component={News} />
        <Tab.Screen name="Funny" component={Funnys} />
      </Tab.Navigator>
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})