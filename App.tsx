/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Home from './src/screens/Home';
import Post from './src/screens/Post';
import {RedditPost} from './src/util/api';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Post: {post: RedditPost} | undefined;
};

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Reddit Posts Challenge" component={Home} />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{title: '', headerBackTitle: 'Back'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
