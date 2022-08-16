import React, { createContext, useContext } from 'react';
//import { signMessage } from '../util/interactLocal.js';

import useCurrentUser from '../hooks/use-current-user.hook';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [address, signed, tools] = useCurrentUser();

  return (
    <AuthContext.Provider
      value={{
        address,
        signed,
        ...tools,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
