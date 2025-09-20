import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fcmTokenFirebase: null,
};

const notificationSlice = createSlice({
  name: 'firebaseToken',
  initialState,
  reducers: {
    setFcmTokenFirebase: (state, action) => {
      state.fcmTokenFirebase = action.payload;
    },
    clearFcmTokenFirebase: (state) => {
      state.fcmTokenFirebase = null;
    },
  },
});

export const { setFcmTokenFirebase, clearFcmTokenFirebase } =
  notificationSlice.actions;

export default notificationSlice.reducer;
