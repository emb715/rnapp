/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Image, Dimensions, ScrollView, Share,
} from 'react-native';
import {
  Subheading, Title, withTheme, FAB, Divider,
} from 'react-native-paper';
import moment from 'moment/min/moment-with-locales';
import HTML from 'react-native-render-html';
// import { getParentsTagsRecursively } from 'react-native-render-html/src/HTMLUtils';
import QueryHOC from '../../components/hoc/query';
import Screen from '../../components/screen';
import theme from '../../theme';
// import PostWrapper from './components/postWrapper';

moment.locale('es');

const { width: deviceWidth } = Dimensions.get('window'); // full width
// 16:9
const aspectRatio = Math.round(deviceWidth / 1.5625);

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    alignSelf: 'stretch',
    position: 'relative',
  },
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    marginHorizontal: theme.gap.sm,
  },
  content: {
    flex: 1,
    marginTop: aspectRatio - 60,
    padding: theme.gap.md,
    backgroundColor: 'white',
    borderRadius: theme.roundness,
  },
  featuredImage: {
    position: 'relative',
    zIndex: 0,
    width: deviceWidth,
    height: aspectRatio,
    backgroundColor: theme.colors.grey,
  },
  placeholder__SPACER: {
    flex: 1,
    height: 300,
  },
  screenContent: {
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 26,
    color: theme.colors.primary,
    marginBottom: theme.gap.sm,
  },
  subtitle: {
    fontFamily: theme.fonts.light,
  },
  divider: {
    marginVertical: theme.gap.md,
  },
  html: {},
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: theme.gap.md,
    zIndex: 999,
  },
});

const postQuery = `
query Post($id: ID!) {
  getPost(id: $id){
    id
    titleSanitized
    content
    audit {
      createdAt
    }
  }
}
`;
const renderPost = ({ getPost }) => {
  const {
    titleSanitized,
    content,
    createdAt,
  } = getPost;
  const date = moment(createdAt).fromNow();

  return (
    <View style={styles.content}>
      <Title style={styles.title}>{titleSanitized}</Title>
      <Subheading style={styles.subtitle}>{date}</Subheading>
      <Divider style={styles.divider} />
      <View style={styles.html}>
        <HTML
          html={content}
          imagesMaxWidth={deviceWidth}
          staticContentMaxWidth={deviceWidth}
          renderers={{
            // postWrapper: ({ href }) => <PostWrapper href={href} />,
          }}
          alterNode={(node) => {
            const {
              name, parent, attribs, children,
            } = node;
            // getParentsTagsRecursively(parent).indexOf('div') !== -1
            if (name === 'iframe') {
              return {
                ...node,
                attribs: {
                  ...(node.attribs || {}),
                  src: node.attribs['data-source'],
                  style: 'background: transparent',
                  allowtransparency: 'true',
                  width: deviceWidth - theme.gap.sm,
                  height: aspectRatio - theme.gap.sm,
                },
              };
            }
            if (name === 'blockquote' && attribs.class === 'wp-embedded-content') {
              const { href } = children[0].children[0].attribs;
              return {
                ...node,
                // name: 'postWrapper',
                attribs: {
                  ...(node.attribs || {}),
                  href,
                },
              };
            }
          }}
          classesStyles={{
            'wp-embedded-content': {
              display: 'none',
            },
            genoa_player_video_wrapper: {
              flex: 1,
              alignSelf: 'stretch',
              marginVertical: theme.gap.md,
              backgroundColor: theme.colors.grey,
            },
            genoa_player_video: {
              marginLeft: -theme.gap.lg,
            },
          }}
          tagsStyles={{
            p: {
              fontSize: 16,
              fontFamily: theme.fonts.regular,
              color: theme.colors.primary,
            },
            h2: {
              fontFamily: theme.fonts.regular,
              fontSize: 22,
              fontWeight: '300',
            },
            iframe: {
              width: deviceWidth,
              backgroundColor: 'blue',
            },
          }}
        />
      </View>
    </View>
  );
};

const placeholder = (titleSanitized, date) => (
  <View style={styles.content}>
    <Title style={styles.title}>{titleSanitized}</Title>
    <Subheading style={styles.subtitle}>{date}</Subheading>
    <Divider style={styles.divider} />
    <View style={styles.placeholder__SPACER}></View>
  </View>
);

const Post = ({ navigation }) => {
  const {
    id, titleSanitized, featuredMedia, createdAt,
  } = navigation.state.params || {};

  const shareAction = async () => {
    const result = await Share.share({
      title: 'Share Title',
      message: 'Share Message',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  };


  const date = moment(createdAt).fromNow();

  const headerProps = {
    title: titleSanitized,
    actions: [{
      icon: 'share',
      onPress: () => shareAction(),
    }],
  };

  const FeaturedImage = () => (
    <Image
      style={styles.featuredImage}
      source={{ uri: featuredMedia.url }}
    />
  );

  return (
    <Screen
      headerProps={headerProps}
      padder={false}
      styleContent={styles.screenContent}
      hasScroll={false}
    >
      <View style={styles.holder}>
        <FeaturedImage />
        <ScrollView style={styles.container}>
          <QueryHOC
            query={postQuery}
            variables={{ id }}
            renderCallback={renderPost}
            loadingComp={() => placeholder(titleSanitized, date)}
          />
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="share"
          onPress={() => shareAction()}
        />
      </View>
    </Screen>
  );
};

Post.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default withTheme(Post);
