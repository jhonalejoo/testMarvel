import React from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import { ICardHeroe } from './ICardHeroe';
import { styles } from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const CardHeroe: React.FC<ICardHeroe> = ({id, name, thumbnail, comics }) => {

  type RootStackParamList = {
    Details: {
      id: number;
      name: string;
      thumbnail: { path: string; extension: string };
      comics: { available: number };
    };
  };
  const navigation =useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate('Details', { id,name, thumbnail, comics })}    style={styles.card}>
      {
        thumbnail?.path && thumbnail?.extension && (
          <Image
            resizeMode='contain'
            source={{ uri: `${thumbnail.path.replace('http', 'https')}.${thumbnail.extension}` }}             style={styles.image}
          />
        )
      }
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
            <Text style={styles.comicsCount}>
              Cómics: {comics?.available  ? comics.available : 0}
            </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardHeroe;
