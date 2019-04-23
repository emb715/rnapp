import { DefaultTheme } from 'react-native-paper';

const constants = {
  unit: 8,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2c2c30',
    secundary: '#ca2435',
    accent: '#e52d40',
    background: '#ededed',
    grey: '#eee',
  },
  gap: {
    unit: constants.unit,
    xs: constants.unit / 2,
    sm: constants.unit,
    md: constants.unit * 2,
    lg: constants.unit * 3,
    xl: constants.unit * 4,
  },
};

export default theme;
