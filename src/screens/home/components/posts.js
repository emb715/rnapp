import React from 'react';
import {
  StyleSheet, Text, View, Dimensions,
} from 'react-native';
import {
  Button, Card, Title, Paragraph, withTheme, ProgressBar,
} from 'react-native-paper';
import moment from 'moment/min/moment-with-locales';
import NavigatorService from '../../../services/navigator';
import theme from '../../../theme';

import QueryHOC from '../../../components/hoc/query';

moment.locale('es');

const { width: deviceWidth } = Dimensions.get('window'); // full width
// 16:9
const aspectRatio = Math.round(deviceWidth / 1.5625);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: aspectRatio,
  },
  placeholder_image: {
  },
  p: {
    fontSize: 16,
  },
});

const postQuery = `
query Posts {
  getPosts{
    id
    title
    titleSanitized
    excerpt
    excerptSanitized
    audit {
      createdAt
    }
    featuredMedia {
      url
    }
  }
}
`;
const renderPosts = ({ getPosts }) => getPosts.map(({
  id, titleSanitized, excerptSanitized, featuredMedia, createdAt,
}) => {
  let excerpt = excerptSanitized.replace('<p>', '');
  excerpt = excerpt.replace('</p>', '');
  const date = moment(createdAt).fromNow();
  const onPress = (post) => {
    NavigatorService.navigate('post', post);
  };
  return (
    <Card
      key={id}
      style={{ marginBottom: theme.gap.md }}
      onPress={() => onPress({
        id, titleSanitized, featuredMedia, createdAt,
      })}
    >
      <Card.Title title={titleSanitized} subtitle={date} />
      <Card.Cover style={styles.image} source={{ uri: featuredMedia.url }} />

      <Card.Content style={{ paddingTop: theme.gap.sm }}>
        <Paragraph style={styles.p}>{excerpt}</Paragraph>
      </Card.Content>
    </Card>
  );
});

const placeholder = () => (
  <Card style={{ marginBottom: theme.gap.md }}>
    <Card.Title title="▁" subtitle="▁" />
    <View style={[styles.image, styles.placeholder__image]}></View>
    <Card.Content style={{ paddingTop: theme.gap.md, alignItems: 'center', justifyContent: 'center' }}>
      <ProgressBar progress={0.5} />
    </Card.Content>
  </Card>
);

const Posts = () => (
  <QueryHOC
    query={postQuery}
    renderCallback={renderPosts}
    loadingComp={placeholder}
  />
);

export default withTheme(Posts);
