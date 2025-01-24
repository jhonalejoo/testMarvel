import {FlatList, Text, View} from 'react-native';
import CardHeroe from '../../components/card/cardHeroe/CardHerore';
import {
  CachedRequestsProvider,
  useCachedRequests,
} from '../../contexts/CachedRequestsProvider';

function HeroesList() {
  const [state, actions] = useCachedRequests();
  const heroData = state.data as
    | {
        comics: {available: number; items: any[]};
        thumbnail: {path: string; extension: string};
        id: number;
        name: string;
      }[]
    | undefined;
  return (
    <View>
      <FlatList
        data={heroData || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <CardHeroe
            id={item.id}
            name={item.name}
            thumbnail={item.thumbnail}
            comics={item.comics}
          />
        )}
        onEndReached={actions.paginate}
      />
    </View>
  );
}

const Home = () => {
  return (
    <CachedRequestsProvider
      maxResultsPerPage={10}
      url={'/v1/public/characters'}>
      <HeroesList />
    </CachedRequestsProvider>
  );
};

export default Home;
