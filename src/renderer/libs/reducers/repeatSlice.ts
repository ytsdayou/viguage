import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import { RepeatProps } from '../../../types/video';

export interface RepeatState {
  value: RepeatProps;
}

const initialState: RepeatState = {
  value: {
    count: 0,
    begin: 0,
    end: 0,
  },
};

export const repeatSlice = createSlice({
  name: 'repeat',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setRepeat: (state, action: PayloadAction<RepeatProps>) => {
      state.value = action.payload;
    },
  },
});

export const { setRepeat } = repeatSlice.actions;

export const selectRepeat = (state: RootState) => state.repeat.value;

export default repeatSlice.reducer;
