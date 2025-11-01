import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  role: null, // 'admin' or 'student'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.name;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.currentUser = null;
      state.role = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
