import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import performanceReducer from './performanceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    performance: performanceReducer,
  },
});

export default store;
