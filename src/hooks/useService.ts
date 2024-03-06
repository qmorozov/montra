import { useStore } from 'react-redux';
import { ServiceProviderDispatched } from '@services/service';
import { AppState, useAppDispatch } from '@services/store/app-store';

export function useService<S extends ServiceProviderDispatched>(
  serviceProvider: S
): ReturnType<S['service']> {
  const dispatch = useAppDispatch();
  const store = useStore<AppState>();

  return serviceProvider.service(store.getState(), dispatch);
}
