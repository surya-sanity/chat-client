import { allApis } from '../services/allApi';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { signUpApi } from './../services/signupService';
import tokenReducer from "./reducers/tokenReducer";
import userReducer from "./reducers/userReducer";
import storage from 'redux-persist/lib/storage'
import { userApi } from '../services/userService';
import { loginApi } from '../services/loginService';
import { combineReducers, AnyAction, Reducer } from 'redux'
import socketReducer from './reducers/socketReducer';
import chatReducer from './reducers/chatReducer';

const reducers = combineReducers({
  [allApis.reducerPath]: allApis.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [signUpApi.reducerPath]: signUpApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  user: userReducer,
  token: tokenReducer,
  socket: socketReducer,
  chat: chatReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return reducers(state, action)
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "token"],
  transforms: [
    encryptTransform({
      secretKey: "ebookApplicationKey",
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(allApis.middleware).
      concat(userApi.middleware).
      concat(signUpApi.middleware).
      concat(loginApi.middleware)

    return middlewares;
  },
});

const persistor = persistStore(store);
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
