/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import playTimeReducer from './reducers/playTimeSlice';
import repeatRediucer from './reducers/repeatSlice';

export const store = configureStore({
  reducer: {
    playTime: playTimeReducer,
    repeat: repeatRediucer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
