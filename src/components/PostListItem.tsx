import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RedditPost} from '../util/api';

export interface PostListItemProps {
  item: RedditPost;
  onPress: (item: RedditPost) => void;
}

export default function PostListItem({
  item,
  onPress,
}: PostListItemProps): JSX.Element {
  return (
    <TouchableOpacity style={styles.touchable} onPress={() => onPress(item)}>
      <Text>{item.data.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
  },
});
