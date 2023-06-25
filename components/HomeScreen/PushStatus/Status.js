import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URI_Pots,URI_GET_DATA_CATEGORY } from '../../../UriDataBase';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './statusStyle';

const Status = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [Content, setContent] = useState('');

  const [DataCategory, setDataCategory] = useState([]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [image, setImage] = useState(
    'https://wallpaperaccess.com/full/1556608.jpg',
  );

  const onpenImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      quality: 1,
      includeBase64: true,
      includeExtra: true,
    });
    if (!result.didCancel) {
      setImage('data:image/png;base64,' + result.assets[0].base64);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      userLogin();
      getDataCategory();
    });

    return unsubscribe;
  }, [navigation]);

  const userLogin = async () => {
    try {
      const data = await AsyncStorage.getItem('Object');
      if (data !== null) {
        setData(JSON.parse(data));
        // AsyncStorage.clear();
        // console.log(Data);
      } else {
        console.log('null');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const getDataCategory = async () => {
    fetch(URI_GET_DATA_CATEGORY)
      .then(res => res.json())
      .then(data => {
        const DataNew = data.map(item => {
          return {label: item.name, value: item.id};
        });
        setDataCategory(DataNew);
      })
      .catch(error => console.log(error));
  };

  const putStatus = () => {
    if (Content === '' ) {
      Alert.alert('Thông báo', 'Vui lòng không để trống', [
        {text: 'OK', style: 'cancel'},
      ]);
    } else {
      const DataPOst = {
        content: Content,
        image: image,
        userId: Data[0].id,
        theloaiId: value,
      };
      fetch(URI_Pots, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(DataPOst),
      })
        .then(res => {
          if (res.status === 201) {
            Alert.alert('Thông báo', 'Thêm bài viểt thành công', [
              {text: 'OK', style: 'cancel', onPress: navigation.goBack()},
            ]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* {isLoading ? <ActivityIndicator size={'large'} /> : <Text>Hi</Text>} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomColor: 'silver',
          borderBottomWidth: 1,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{width: 30, height: 20}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png',
              }}
            />
          </TouchableOpacity>

          <Text style={{color: 'black', marginHorizontal: 15}}>
            TẠO BÀI VIẾT
          </Text>
        </View>
        <TouchableOpacity onPress={putStatus}>
          <Text
            style={{
              width: 80,
              height: 37,
              backgroundColor: '#3DC5FF',
              lineHeight: 35,
              textAlign: 'center',
              borderRadius: 5,
              color: 'white',
            }}>
            ĐĂNG
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          flex: 11,
          borderBottomColor: 'silver',
          borderBottomWidth: 1,
        }}>
        <View style={{flexDirection: 'row', marginTop: 6}}>
          {isLoading ? (
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                resizeMode: 'center',
              }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              }}
            />
          ) : (
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                resizeMode: 'center',
              }}
              source={{
                uri: Data[0].avata,
              }}
            />
          )}
          <View>
            {isLoading ? (
              <Text>Loading..</Text>
            ) : (
              <Text style={{marginLeft: 12, fontSize: 18, color: 'black'}}>
                {Data[0].name}
              </Text>
              
            )}
            
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              data={DataCategory}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Thể loại' : '...'}
              value={value}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        <TextInput
          style={{height: 50}}
          placeholder="Bạn đang nghĩ gì ?.."
          onChangeText={text => setContent(text)}
        />
 <View style={{flex: 1, alignItems: 'center', flexDirection: 'row',marginTop:100}}>
          <Image
            style={{width: 35, height: 35, marginLeft: 10}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png',
            }}
          />
          <TextInput style={{color: 'black',width:400}} placeholder="Anh"
          onChangeText={text => setImage(text)}></TextInput>
        </View>
        <Image
          source={{uri: image}}
          style={{width: '100%', height: 300}}
          resizeMode={'stretch'}
        />
      </View>
      <TouchableOpacity onPress={onpenImage} style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
          <Image
            style={{width: 35, height: 35, marginLeft: 10}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png',
            }}
          />
          <Text style={{color: 'black', marginLeft: 15}}>Ảnh / Video</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Status;
