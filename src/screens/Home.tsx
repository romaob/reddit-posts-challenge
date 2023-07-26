import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {POST_TYPE, RedditPost, getPosts} from '../util/api';
import PostList from '../components/PostList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import SortButton from '../components/SortButton';

export default function Home(): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sortSelected, setSortSelected] = useState(POST_TYPE.HOT);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 2000)); //! Just to better test the loading state
      const posts = await getPosts(sortSelected);
      setData(posts);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [sortSelected]);

  useEffect(() => {
    fetchData();
  }, [fetchData, sortSelected]);

  function renderErrorState(): JSX.Element | null {
    if (error && !loading) {
      return (
        <View>
          <Text style={styles.errorText}>Something went wrong!</Text>
        </View>
      );
    } else {
      return null;
    }
  }

  function renderLoadingState(): JSX.Element | null {
    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return null;
    }
  }

  function onPostPressHandler(item: RedditPost): void {
    navigation.navigate('Post', {post: item});
  }

  return (
    <View style={styles.page}>
      {renderErrorState()}
      {renderLoadingState()}
      {!loading && !error && (
        <>
          <View style={styles.sortMenu}>
            <SortButton
              label="Top"
              onPress={() => setSortSelected(POST_TYPE.TOP)}
              active={sortSelected === POST_TYPE.TOP}
            />
            <SortButton
              label="New"
              onPress={() => setSortSelected(POST_TYPE.NEW)}
              active={sortSelected === POST_TYPE.NEW}
            />
            <SortButton
              label="Hot"
              onPress={() => setSortSelected(POST_TYPE.HOT)}
              active={sortSelected === POST_TYPE.HOT}
            />
            <SortButton
              label="Controversial"
              onPress={() => setSortSelected(POST_TYPE.CONTROVERSIAL)}
              active={sortSelected === POST_TYPE.CONTROVERSIAL}
            />
          </View>
          <PostList data={data} onItemPress={onPostPressHandler} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
  sortMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
});
