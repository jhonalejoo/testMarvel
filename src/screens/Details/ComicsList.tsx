import React from 'react';
import {FlatList, Text, View, Image} from 'react-native';
import {useCachedRequests} from '../../contexts/CachedRequestsProvider';
import CardComic from '../../components/card/cardComic/CardComic';

interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export function ComicsList() {
  const [state, actions] = useCachedRequests();
  const comicsData = state.data as Comic[] | undefined;

  return (
    <View>
      <FlatList
        data={comicsData}
        renderItem={({item}: {item: Comic}) => <CardComic item={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={actions.paginate}
      />
    </View>
  );
}
