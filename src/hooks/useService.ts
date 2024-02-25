import { ServiceProviderDispatched } from '@services/service';
import { useAppDispatch } from '@hooks/useAppRedux';
import { AppState } from '@services/app-store';
import { useTypedSelector } from '@hooks/useTypedSelector';

export function useService<S extends ServiceProviderDispatched>(
  serviceProvider: S
): ReturnType<S['service']> {
  const dispatch = useAppDispatch();
  const slice = useTypedSelector((state) =>
    serviceProvider.slice
      ? state[serviceProvider.slice as keyof AppState]
      : undefined
  );
  return serviceProvider.service(slice, dispatch);
}
