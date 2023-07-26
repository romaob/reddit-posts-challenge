import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import {RedditPost} from '../util/api';
import {getRelativeTimeFromNow} from '../util/dateUtils';

export interface PostListItemProps {
  item: RedditPost;
  onPress: (item: RedditPost) => void;
}

export default function PostListItem({
  item,
  onPress,
}: PostListItemProps): JSX.Element {
  // Function to check if it should render the Image, based on the thumbnail value
  function showImage(): boolean {
    return item.data.thumbnail !== 'self';
  }

  function postTimeParser(): string {
    const postTime = new Date(item.data.created_utc * 1000);
    return getRelativeTimeFromNow(postTime);
  }

  return (
    <TouchableOpacity style={styles.touchable} onPress={() => onPress(item)}>
      {showImage() && (
        <Image source={{uri: item.data.thumbnail}} style={styles.thumbnail} />
      )}
      <View style={styles.postContent}>
        <Text style={styles.title}>{item.data.title}</Text>
        <Text style={styles.author}>By: {item.data.author_fullname}</Text>
        <View style={styles.postInfo}>
          <Text style={styles.score}>Score: {item.data.score}</Text>
          <Text style={styles.comments}>{item.data.num_comments} comments</Text>
          <Text style={styles.time}>{postTimeParser()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    display: 'flex',
    minHeight: 200,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  thumbnail: {
    width: '100%',
    height: 120,
  },
  postContent: {
    flex: 1,
    gap: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  author: {
    fontSize: 16,
  },
  postInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  score: {
    flex: 1,
  },
  comments: {
    flex: 1,
  },
  time: {
    flex: 1,
    display: 'flex',
    textAlign: 'right',
  },
});
