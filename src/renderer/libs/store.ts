import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import playTimeReducer from './reducers/playTimeSlice';

export const store = configureStore({
  reducer: {
    playTime: playTimeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
