import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
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
      <Image source={{uri: item.data.thumbnail}} style={styles.thumbnail} />
      <View style={styles.postContent}>
        <Text style={styles.title}>{item.data.title}</Text>
        <Text style={styles.author}>{item.data.author_fullname}</Text>
        <View style={styles.postInfo}>
          <Text style={styles.score}>{item.data.score} points</Text>
          <Text style={styles.comments}>{item.data.num_comments} comments</Text>
          <Text style={styles.time}>{item.data.created_utc} time</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
  },
  thumbnail: {
    width: '100%',
    height: 120,
  },
  postContent: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
  },
  postInfo: {
    flexDirection: 'row',
  },
  score: {
    marginRight: 10,
  },
  comments: {
    marginRight: 10,
  },
  time: {
    marginRight: 10,
  },
});
