import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Form {
  title: string | undefined;
  firstname: string;
  lastname: string;
  birthday: string | null;
  nationality: string | undefined;
  citizenID: string;
  gender: string | undefined;
  phone: string;
  passport: string;
  salary: string;
}

const initialState: Form = {
  title: undefined,
  firstname: '',
  lastname: '',
  birthday: '',
  nationality: '',
  citizenID: '',
  gender: "",
  phone: '',
  passport: '',
  salary: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: keyof Form; value: string }>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { setField, resetForm } = formSlice.actions;
export default formSlice.reducer;
