import { combineReducers } from 'redux';
import memoReducer from './Memo';

const rootReducer = combineReducers({
  memoReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
