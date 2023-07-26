import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';

export default function Post({route}: any): JSX.Element {
  const [postUrl, setPostUrl] = useState<string | null>(
    route.params?.post?.data?.url || null,
  );

  function renderError(): JSX.Element | null {
    if (!postUrl) {
      return <Text>Unable to load post. Please try again later.</Text>;
    } else {
      return null;
    }
  }

  useEffect(() => {
    setPostUrl(route.params?.post?.data?.url);
  }, [route.params?.post?.data?.url]);

  return (
    <View style={styles.page}>
      {renderError()}
      {postUrl && (
        <WebView
          source={{uri: postUrl}}
          style={styles.webview}
          startInLoadingState={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
