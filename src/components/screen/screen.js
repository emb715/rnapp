import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView, StatusBar, StyleSheet, View, Text, ScrollView,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import Header from './header';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  content__PADDING: {
    padding: theme.gap.sm,
  },
});

const Screen = ({
  children, statusBarStyle, headerProps, hasScroll, header, padder, style, styleContent,
}) => (
    <SafeAreaView style={[styles.container, style || '']}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle={statusBarStyle} />
      {header && <Header {...headerProps} />}
      {hasScroll
        ? (<ScrollView style={[styles.content, padder ? styles.content__PADDING : '', styleContent || '']}>{children}</ScrollView>)
        : (<View style={[styles.content, padder ? styles.content__PADDING : '', styleContent || '']}>{children}</View>)
      }
    </SafeAreaView>
);


Screen.propTypes = {
  statusBarStyle: PropTypes.string,
  children: PropTypes.node,
  headerProps: PropTypes.shape(),
  hasScroll: PropTypes.bool,
  header: PropTypes.bool,
  padder: PropTypes.bool,
  style: PropTypes.any,
  styleContent: PropTypes.any,
};

Screen.defaultProps = {
  statusBarStyle: 'light-content',
  children: (<View><Text>No children pass in props</Text></View>),
  headerProps: {},
  hasScroll: true,
  header: true,
  padder: true,
  style: null,
  styleContent: null,
};

export default withTheme(Screen);
