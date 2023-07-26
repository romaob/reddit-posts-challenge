import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RedditPost, getPosts} from '../util/api';
import PostList from '../components/PostList';

export default function Home(): JSX.Element {
  const [data, setData] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 2000));
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

  return (
    <View style={styles.page}>
      {renderErrorState()}
      {renderLoadingState()}
      {!loading && !error && <PostList data={data} onItemPress={() => {}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});
