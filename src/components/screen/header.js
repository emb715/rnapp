import React from 'react';
import PropTypes from 'prop-types';
import { Appbar, withTheme } from 'react-native-paper';
import NavigatorService from '../../services/navigator';

/**
 *
 * @param {actions} array
 * actions = [{
 *    icon,*
 *    color,
 *    size,
 *    disabled,
 *    style,
 *    onPress,
 * }];
 */

function Header({
  backButton, backButtonDisabled, title, subtitle, actions,
}) {
  const BackAction = backButton && (
    <Appbar.BackAction
      disabled={backButtonDisabled}
      onPress={() => NavigatorService.back()}
    />
  );

  const ActionButtons = actions.length > 0 && actions.map((action, index) => {
    if (action.icon) {
      return (<Appbar.Action key={index} {...action} />);
    }
    return null;
  });
  return (
    <Appbar.Header>
      {BackAction}

      <Appbar.Content
        title={title}
        subtitle={subtitle}
      />
      {ActionButtons}

      {/* <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} /> */}
    </Appbar.Header>
  );
}

Header.propTypes = {
  backButton: PropTypes.bool,
  backButtonDisabled: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleStyle: PropTypes.any,
  subtitleStyle: PropTypes.any,
  actions: PropTypes.arrayOf(PropTypes.shape()),
};

Header.defaultProps = {
  backButton: true,
  backButtonDisabled: false,
  title: 'Title',
  subtitle: '',
  titleStyle: null,
  subtitleStyle: null,
  actions: [],
};

export default withTheme(Header);
