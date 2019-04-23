import update from 'immutability-helper';

export const initialState = {
  config: null,
  nav: {},
};

export const reducers = {
  setConfig: (state, config) => update(state, {
    config: { $set: config },
  }),
  setNav: (state, nav) => update(state, {
    nav: { $set: nav },
  }),
};
