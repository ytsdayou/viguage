import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'playTime',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPlayTime: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setPlayTime } = counterSlice.actions;

export const selectPlayTime = (state: RootState) => state.playTime.value;

export default counterSlice.reducer;
