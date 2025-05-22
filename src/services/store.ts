import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import constructorReducer from './slices/constructorSlice';
import ordersReducer from './slices/ordersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Создаем новый экземпляр хранилища
const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    feed: feedReducer,
    user: userReducer,
    constructor: constructorReducer,
    orders: ordersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку сериализуемости для решения проблем
      immutableCheck: false // Отключаем проверку изменяемости для решения проблем
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
