import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  '30sec': 0,
  '1min': 0,
  '3min': 0,
};

export const remainingTimeSlice = createSlice({
  name: 'remainingtime',
  initialState,
  reducers: {
    setRemainingTime: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setRemainingTime } = remainingTimeSlice.actions;
export default remainingTimeSlice.reducer;
