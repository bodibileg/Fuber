import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const TypesRow = ({type, onPress, isSelected, price}) => {
  const getImage = type => {
    if (type === 'UberX') {
      return require('../../assets/images/UberX_v1.png');
    }
    return require('../../assets/images/UberXL.png');
  };

  return (
    <Pressable
      style={[
        styles.containerButton,
        {
          borderColor: isSelected ? 'black' : 'white',
        },
      ]}
      onPress={onPress}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <Image
          style={{
            width: 60,
            height: 60,
            resizeMode: 'contain',
            // borderWidth: 1, borderColor: "#000"
          }}
          source={getImage(type)}
        />
      </View>
      <View style={{flex: 3}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontWeight: '500', fontSize: 20}}>
            {type} <Icon name="user-alt" color="#000" />{' '}
            <Text style={{fontSize: 15}}>{type === 'UberX' ? 4 : 6}</Text>
          </Text>
          <Text style={{fontWeight: '300'}}>
            {new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}{' '}
            dropoff
          </Text>
        </View>
      </View>

      <Text style={{fontWeight: '500', flex: 1}}>$ {price}</Text>
    </Pressable>
  );
};

export default TypesRow;
