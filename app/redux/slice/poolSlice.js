import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  '30sec': null,
  '1min': null,
  '3min': null,
};

export const poolSlice = createSlice({
  name: 'remainingtime',
  initialState,
  reducers: {
    setpool: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setpool } = poolSlice.actions;
export default poolSlice.reducer;
