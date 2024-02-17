
import { configureStore } from '@reduxjs/toolkit';
// import { persistStore} from 'redux-persist';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import persistedReducer from './reducers/rootReducer';


// const middleware = [thunk]

const store = configureStore({reducer:persistedReducer,middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),});
export const persistor = persistStore(store);

export default store;