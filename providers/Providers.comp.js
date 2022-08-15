import React from 'react';
import AuthProvider from './AuthProvider';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <div className="app">{children}</div>
    </AuthProvider>
  );
}
