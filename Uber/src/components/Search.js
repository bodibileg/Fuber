import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SearchBar({ handleClick}) {
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={{
        backgroundColor: '#f6f5f4',
        marginHorizontal: 15,
        marginVertical: 15,
        height: 52,
        borderRadius: 30,
        flexDirection: 'row',
        position: 'relative',
        borderColor: 'white',
        borderWidth: 1,
      }}>
      <View style={{marginHorizontal: 15, marginVertical: 12}}>
        <Octicons name="search" size={25} />
      </View>
      <Text
        style={{
          marginVertical: 15,
          fontWeight: 'bold',
          color: 'grey',
          fontSize: 20,
          flex: 7,
        }}>
        Where to?
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          alignSelf: 'flex-end',
          flex: 3,
          height: 30,
          borderRadius: 30,
          marginEnd: 10,
          marginVertical: 10,
        }}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: 'row',
          }}>
          <Ionicons name="time" size={20} />
          <Text style={{marginHorizontal: 5, marginTop: 3}}>Now</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SearchBar;
