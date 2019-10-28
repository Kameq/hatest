import storiesListReducer from './storiesList';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
  storiesList: storiesListReducer
  });

export default allReducers;