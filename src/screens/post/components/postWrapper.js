import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View,
} from 'react-native';
import {
  Paragraph,
} from 'react-native-paper';
import QueryHOC from '../../../components/hoc/query';

const query = `
query Post($slug: String!) {
  getPostBySlug(slug: $slug){
    id
    titleSanitized
    excerptSanitized
    featuredMedia {
      url
    }
    audit{
      createdAt
    }
  }
}`;
const renderPost = ({ getPostBySlug }) => {
  return (
  <View key={getPostBySlug.id}>
    <Text>{getPostBySlug.titleSanitized}</Text>
    <Paragraph>{getPostBySlug.excerptSanitized}</Paragraph>
  </View>);
};

const PostWrapper = ({ href }) => {
  let slug = href.replace('https://radiomitre.cienradios.com/', '');
  slug = slug.replace('/', '');
  return (
    <QueryHOC
      query={query}
      variables={{ slug }}
      renderCallback={renderPost}
    />
  );
};

export default PostWrapper;
