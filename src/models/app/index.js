import { initialState as state, reducers } from './reducers';
import effects from './effects';

const model = {
  effects,
  state,
  reducers,
};

export default model;
