import {View, Text, Image} from 'react-native';
import React from 'react';

const UserFollow = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
      }}>
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 100,
          resizeMode: 'center',
        }}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTepCOc_6v1qCuSwRuy5gXzv0Z4pY8eZsJFKb55haJt6ywvsP3lmkEBAQ3r65iYZIfeui0&usqp=CAU',
        }}
      />
      <Text style={{marginLeft: 15, fontWeight: 'bold'}}>Pham The Hung</Text>
    </View>
  );
};

export default UserFollow;
