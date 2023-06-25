import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import UserComment from './UserCommnet/UserComment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URI_Commnets,URI_POST_Commnets} from '../../UriDataBase';

const Comment = ({navigation, route}) => {
  const {potId} = route.params;
  const [dataCmt, setdataCmt] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [comment, setcomment] = useState('');
  const [UserId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  console.log(potId);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataCmtWithIDPots();
      getUserId();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataCmtWithIDPots();
  }, []);

  const getDataCmtWithIDPots = async () => {
    try {
      const res = await fetch(URI_Commnets + potId);
      const json = await res.json();
      setdataCmt(json);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
      setRefreshing(false);
    }
  };

  //lấy ra id của user khi đăng nhập hiện tại để cho vào thuộc tính userId khi cmt
  const getUserId = async () => {
    try {
      const data = await AsyncStorage.getItem('Object');
      setUserId(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };
  const seenCmt = () => {
    const pustCmt = {content: comment, potId: potId, userId: UserId[0].id};
    comment === ''
      ? Alert.alert('Thông báo', 'Vui lòng nhập nội dung', [
          {text: 'OK', style: 'cancel'},
        ])
      : fetch(URI_POST_Commnets, {
          method: 'POST',
          headers: {
            Accepct: 'apllication/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pustCmt),
        })
          .then(res => {
            if (res.status === 201) {
              getDataCmtWithIDPots();
              setcomment('');
            }
          })
          .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'silver'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{width: 20, height: 20, marginLeft: 20, marginTop: 20}}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/9533/9533047.png',
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 10,
          backgroundColor: 'white',
          marginTop: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingHorizontal: 20,
        }}>
        <Text style={{marginTop: 15}}>Tất cả bình luận</Text>
        {isLoading ? (
          <View></View>
        ) : (
          <FlatList
            style={{marginTop: 10}}
            data={dataCmt}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => (
              <UserComment
                name={item.user.name}
                description={item.content}
                avatar={item.user.avata}
              />
            )}
          />
        )}
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Nhập bình luận của bạn"
          style={{
            borderWidth: 1,
            borderColor: 'silver',
            paddingLeft: 15,
            borderRadius: 100,
            width: '85%',
          }}
          value={comment}
          onChangeText={text => setcomment(text)}
        />
        <TouchableOpacity onPress={seenCmt}>
          <Image
            style={{width: 30, height: 30, marginLeft: 20}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/9131/9131510.png',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;
