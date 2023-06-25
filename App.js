import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Register from './components/registerScreen/Register';
import Status from './components/HomeScreen/PushStatus/Status';
import Tabs from './components/Tabs';
import React from 'react'
import Post from './components/HomeScreen/Posts/post';
import Home from './components/HomeScreen/Home';
import Follower from './components/Folower/Follower';
import UserDetaill from './components/UserDetail/UserDetaill';
import Comment from './components/CommentScreen/CommentScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Login" component={Login}options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Follower" component={Follower} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen name="UserDetaill" component={UserDetaill} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
