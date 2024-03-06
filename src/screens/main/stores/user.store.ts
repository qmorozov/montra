import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
export interface IUserState {
  id: string;
  email: string;
  password: string;
  phone?: string | null;
  name: string;
  avatar?: string | null;
  age?: number | null;
  country?: string | null;
  phone_verified?: boolean;
  email_verified?: boolean;
}

export const initialState: IUserState = {
  id: '',
  email: '',
  password: '',
  phone: null,
  name: '',
  avatar: null,
  age: null,
  country: null,
  phone_verified: false,
  email_verified: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<Partial<IUserState>>) => {
      return { ...state, ...action.payload };
    },

    setPhoneVerified: (state, action: PayloadAction<boolean>): void => {
      state.phone_verified = action.payload;
    },

    setEmailVerified: (state, action: PayloadAction<boolean>): void => {
      state.email_verified = action.payload;
    },
  },
});

export const UserReducer: Reducer<IUserState> = UserSlice.reducer;

export default UserReducer;
