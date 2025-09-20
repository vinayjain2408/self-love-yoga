import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: Number(localStorage.getItem('count')) || 0,
};

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      localStorage.setItem('count', state.value);
    },
    decrement: (state) => {
      state.value -= 1;
      localStorage.setItem('count', state.value);
    },
  },
});

export const { increment, decrement } = countSlice.actions;

export default countSlice.reducer;
