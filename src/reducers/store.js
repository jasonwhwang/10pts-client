import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import common from './common'
import search from './search'

const rootReducer = combineReducers({
  common,
  search
});

// Change both migration version and persistConfig version for migration
// const migrations = {
//   0: state => rootReducer
// }

const persistConfig = {
  key: 'root',
  storage,
  version: 0,
  // migrate: createMigrate(migrations, {debug: true})
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
}