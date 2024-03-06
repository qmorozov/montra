import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface IGlobalState {
  loading: boolean;
  refreshToken: boolean;
}

export const initialState: IGlobalState = {
  loading: false,
  refreshToken: false,
};

export const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state: IGlobalState, action: PayloadAction<boolean>): void => {
      state.loading = action.payload;
    },

    setRefreshToken: (
      state: IGlobalState,
      action: PayloadAction<boolean>
    ): void => {
      state.refreshToken = action.payload;
    },
  },
});

export const GlobalReducer = GlobalSlice.reducer;

export default GlobalReducer;
