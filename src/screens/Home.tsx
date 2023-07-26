import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RedditPost, getPosts} from '../util/api';
import PostList from '../components/PostList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

export default function Home(): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 2000)); //! Just to better test the loading state
        const posts = await getPosts();
        setData(posts);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
        <PostList data={data} onItemPress={onPostPressHandler} />
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
});
