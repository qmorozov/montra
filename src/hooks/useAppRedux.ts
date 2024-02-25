import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState, AppThunkDispatch, RootState } from '@services/app-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

export const useAppDispatch = (): ThunkDispatch<
  AppState,
  unknown,
  Action<any>
> => useDispatch<AppThunkDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
