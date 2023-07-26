import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import {RedditPost} from '../util/api';
import {getRelativeTimeFromNow} from '../util/dateUtils';
import colors from '../values/colors';

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
        <View style={styles.profileInfo}>
          <Image
            source={require('../assets/icons/person-icon.png')}
            style={styles.iconLg}
          />
          <Text style={styles.author}>{item.data.author_fullname}</Text>
        </View>
        <View style={styles.postInfo}>
          <View style={styles.postInfoItem}>
            <Image
              source={require('../assets/icons/votes-icon.png')}
              style={styles.icon}
            />
            <Text>{item.data.score}</Text>
          </View>
          <View style={styles.postInfoItem}>
            <Image
              source={require('../assets/icons/comment-icon.png')}
              style={styles.icon}
            />
            <Text>{item.data.num_comments}</Text>
          </View>
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
    backgroundColor: colors.cardBackground,
    marginBottom: 15,
    borderRadius: 5,
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
    color: colors.primary,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLg: {
    width: 28,
    height: 28,
    backgroundColor: colors.disabled,
    borderRadius: 50,
    marginRight: 5,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  postInfoItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  time: {
    flex: 1,
    display: 'flex',
    textAlign: 'right',
  },
});
