import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: JSON.parse(localStorage.getItem('students')) || [],
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
      localStorage.setItem('students', JSON.stringify(state.students));
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
        localStorage.setItem('students', JSON.stringify(state.students));
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(s => s.id !== action.payload);
      localStorage.setItem('students', JSON.stringify(state.students));
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } = performanceSlice.actions;
export default performanceSlice.reducer;
