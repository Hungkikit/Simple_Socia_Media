import { View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  StyleSheet, } from 'react-native'
  import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { URI_Commnets } from '../../../UriDataBase';
const Post2 = props => {
  const navigation = useNavigation();
  const [dataCmt, setdataCmt] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataCmtWithIDPots();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    getDataCmtWithIDPots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: props.content,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log(result.activityType);
        } else {
          // Alert.alert('Thông báo', 'Bạn đã chia sẻ ở đây rồi', [
          //   {text: 'OK', style: 'cancel'},
          // ]);
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getDataCmtWithIDPots = async () => {
    try {
      const res = await fetch(URI_Commnets + props.potId);
      const json = await res.json();
      setdataCmt(json);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <View style={Style.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserDetail', {
              name: props.name,
              image: props.image,
              userId: props.userId,
            })
          }>
          <Image
            source={{
              uri: props.image,
            }}
            style={Style.avatar}
          />
        </TouchableOpacity>

        <Text style={{color: 'black'}}>{props.name}</Text>
      </View>
      <Text style={{color: 'black', marginHorizontal: 18, marginBottom: 10}}>
        {props.content}
      </Text>
      <View style={{flex: 12, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: '90%', height: 210}}
          source={{uri: props.description}}
          resizeMode="stretch"
        />
      </View>
      <View
        style={{marginVertical: 9, alignItems: 'flex-end', marginRight: 10}}>
        <Text>{dataCmt.length} bình luận</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderTopColor: 'silver',
          borderTopWidth: 1,
          flex: 2.5,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            marginLeft: 65,
          }}
          onPress={() => navigation.navigate('Comment', {potId: props.potId})}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 20, height: 20, marginHorizontal: 10}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2462/2462719.png',
              }}
            />

            <Text>Bình luận</Text>
          </View>
        </TouchableOpacity>
        <View />
        <TouchableOpacity style={{width: '45%'}} onPress={onShare}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '45%'}}>
            <Image
              style={{width: 20, height: 20, marginHorizontal: 10}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2958/2958783.png',
              }}
            />
            <Text>Chia sẻ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 15,
    height: 380,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 100,
    resizeMode: 'center',
  },
});
export default Post2;
