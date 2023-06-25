import {View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList, } from "react-native";
import React, {useEffect, useState} from 'react';
import { URI_GET_ALLPOTS_BY_ID_USER } from "../../UriDataBase";
import Post from "../HomeScreen/Posts/post";
import Post2 from "../HomeScreen/Posts/postImage";
const UserDetaill = ({route, navigation}) => {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const {image, name, userId} = route.params;
  // console.log(image);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  const getData = async () => {
    try {
      const res = await fetch(URI_GET_ALLPOTS_BY_ID_USER + userId);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'gainsboro'}}>
      <View style={{height: 150, backgroundColor: 'silver'}}>
        <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
          <Image
            style={{width: 30, height: 20, marginLeft: 10, marginTop: 20}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/9533/9533047.png',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            height: 180,
            marginTop: 100,
          }}></View>
        <Image
          style={{
            width: 120,
            height: 120,
            position: 'absolute',
            borderRadius: 100,
            resizeMode: 'center',
            marginTop: 90,
            marginLeft: 6,
          }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmQ_8NEKZUndtW1Bv9l0nnpPFWmuQonfMGBw_nqxYKYvdEEyMbQlmr7d0k_Y8ey9qkRoo&usqp=CAU",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            marginTop: 78,
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {/* {name} */}Pham The Hung
        </Text>
        {/* <TouchableOpacity>
          <Text
            style={{
              backgroundColor: 'deepskyblue',
              width: 80,
              height: 30,
              textAlign: 'center',
              lineHeight: 28,
              borderRadius: 10,
              color: 'white',
              marginTop: 70,
              marginRight: 20,
            }}>
            Follow
          </Text>
        </TouchableOpacity> */}
      </View>

      <Text
        style={{
          marginTop: 3,
          marginLeft: 10,
          fontSize: 14,
          fontWeight: 'bold',
        }}>
        10 follower
      </Text>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Các bài viết đã chia sẻ
      </Text>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View style={{paddingHorizontal: 10, backgroundColor: 'white'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
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
        </View>
      )}
    </View>
  );
};

export default UserDetaill;
