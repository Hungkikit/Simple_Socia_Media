import {View, Text, Image} from 'react-native';
import React from 'react';

const UserComment = props => {
  return (
    <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          resizeMode: 'center',
        }}
        source={{
          uri: props.avatar,
        }}
      />
      <View
        style={{
          marginLeft: 10,
          backgroundColor: 'silver',
          width: '83%',
          height: 60,
          borderRadius: 20,
          padding: 8,
          paddingLeft: 15,
        }}>
        <Text style={{fontWeight: 'bold'}}>HihI</Text>
        <Text numberOfLines={1}>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</Text>
      </View>
    </View>
  );
};

export default UserComment;
