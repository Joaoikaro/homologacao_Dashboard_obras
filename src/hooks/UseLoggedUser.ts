import {  useQuery } from '@tanstack/react-query';

import { httpClient } from '@/services/httpClient';

import type { LoggedInUser } from '@/types/user';

export function useLoggedUser() {
  const queryLoggedUser = useQuery({
    queryKey: ['loggedUser'],
    queryFn: async (): Promise<LoggedInUser> => {
      const response = await httpClient.get<LoggedInUser>('v1/Account/usuario/listar/logado');

      return response.data;
    },
  });

  return {
    loggedUser: queryLoggedUser,
  };
}
