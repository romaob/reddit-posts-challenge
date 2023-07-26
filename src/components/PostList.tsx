import React from 'react';
import {FlatList} from 'react-native';
import {RedditPost} from '../util/api';
import PostListItem from './PostListItem';

export interface PostListProps {
  data: RedditPost[];
  onItemPress: (item: RedditPost) => void;
}

export default function PostList({
  data,
  onItemPress,
}: PostListProps): JSX.Element {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <PostListItem item={item} onPress={onItemPress} />
      )}
    />
  );
}
