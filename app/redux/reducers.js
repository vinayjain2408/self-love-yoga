import { combineReducers } from '@reduxjs/toolkit';
import ui from './modules/ui';
import count from './slice/countSlice';
import timer from './slice/timerSlice';
import remainingTime from './slice/remainingTime';
import poolData from './slice/poolSlice';
import firebaseToken from './slice/firebaseNotificationSlice';
import userData from './slice/userSlice';
export default function createReducer() {
  const rootReducer = combineReducers({
    ui,
    count,
    timer,
    remainingTime,
    poolData,
    firebaseToken,
    userData,
  });

  return rootReducer;
}
