import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    step: 0,
    data: {
      nickname: '',
      name: '',
      surname: '',
      phone: '',
      email: '',
      sex: '',
      advantages: [''],
      radio: 0,
      checkbox: [],
      about: '',
    },
    submitStatus: null,
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSubmitStatus: (state, action) => {
      state.submitStatus = action.payload;
    },
    resetForm: (state) => {
      state.step = 0;
      state.data = {
        nickname: '',
        name: '',
        sername: '',
        phone: '',
        email: '',
        sex: '',
        advantages: [''],
        radio: 0,
        checkbox: [],
        about: '',
      };
      state.submitStatus = null;
    },
  },
});

export const { setStep, setData, setSubmitStatus, resetForm } = formSlice.actions;
export const selectFormData = (state) => state.form.data;
export const selectSubmitStatus = (state) => state.form.submitStatus;

export default formSlice.reducer;