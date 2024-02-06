import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  signed: boolean;
  loading: boolean;
}

const initialState: IAuthState = {
  signed: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state: IAuthState) => {
      state.signed = true;
      state.loading = false;
    },

    setLoading: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  signIn,
  setLoading,
} = authSlice.actions;
export default authSlice;