import React from 'react';
import {View, Text, Image} from 'react-native';
import {ICardComic} from './ICardComic';
import styles from './styles';

interface CardComicProps {
  item: ICardComic;
}

const CardComic: React.FC<CardComicProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${item.thumbnail.path.replace('http', 'https')}.${item.thumbnail.extension}`,
        }}
        style={styles.thumbnail}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {item.description || 'No description available'}
        </Text>
      </View>
    </View>
  );
};

export default CardComic;
