
import { configureStore } from '@reduxjs/toolkit';
import { persistStore} from 'redux-persist';

// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
// import thunk from 'redux-thunk';
import persistedReducer from './reducers/rootReducer';


// const middleware = [thunk]

const store = configureStore({reducer:persistedReducer});
export const persistor = persistStore(store);

export default store;