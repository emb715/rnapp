import { init } from '@rematch/core';
import models from './models';

const rematchInit = {
  models,
  plugins: [],
};

const store = init(rematchInit);
export const { dispatch, getState } = store;

export default store;
