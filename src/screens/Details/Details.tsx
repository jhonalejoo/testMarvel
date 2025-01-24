import React from 'react';
import {View, Text, Image} from 'react-native';
import detailsStyles from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import { CachedRequestsProvider } from '../../contexts/CachedRequestsProvider';
import { ComicsList } from './ComicsList';

const Details = () => {
  type RootStackParamList = {
    Details: {
      id: number;
      name: string;
      thumbnail: {path: string; extension: string};
    };
  };

  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const {name, thumbnail,id} = route.params;
  const url = `/v1/public/characters/${id}/comics`;

  return (
    <View style={detailsStyles.container}>
      {thumbnail?.path && thumbnail?.extension && (
        <Image
          source={{
            uri: `${thumbnail.path.replace('http', 'https')}.${
              thumbnail.extension
            }`,
          }}
          style={detailsStyles.image}
        />
      )}
      <Text style={detailsStyles.name}>{name}</Text>
      <Text style={detailsStyles.sectionTitle}>Comics:</Text>
      <View style={detailsStyles.comicsListContainer}>
        <CachedRequestsProvider
          maxResultsPerPage={10}
          url={url}>
          <ComicsList/>
        </CachedRequestsProvider>
      </View>
    </View>
  );
};

export default Details;
