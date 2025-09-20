import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'sessionTime',
  initialState: '30-seconds', // Default time
  reducers: {
    setTimer: (state, action) => action.payload, // Set new timer value
  },
});

export const { setTimer } = timerSlice.actions;

export default timerSlice.reducer;
