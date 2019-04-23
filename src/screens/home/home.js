import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import {
  Title, withTheme,
} from 'react-native-paper';
import Posts from './components/posts';

import Screen from '../../components/screen';
import theme from '../../theme';

const styles = StyleSheet.create({
  holder: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginVertical: theme.gap.md,
  },
});

const Home = () => {
  const headerProps = {
    backButton: false,
    actions: [{
      icon: 'user',
      onPress: () => console.log('Pressed user'),
    }],
  };

  return (
    <Screen header={false} padder>
      <View style={styles.holder}>
        <Title style={styles.title}>Últimas noticias</Title>
        <Posts />
      </View>
    </Screen>
  );
};

export default withTheme(Home);
