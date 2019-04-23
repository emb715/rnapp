/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { Paragraph, withTheme } from 'react-native-paper';

import Screen from '../../components/screen';

const styles = StyleSheet.create({
  holder: {
    flex: 1,
  },
});

const Welcome = () => (
    <Screen header={false}>
      <View style={styles.holder}>
        <Paragraph>Welcome Screen</Paragraph>
      </View>
    </Screen>
);

export default withTheme(Welcome);
