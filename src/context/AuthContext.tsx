'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AuthState = {
  isLoggedIn: boolean;
  phone: string | null;
};

type AuthContextType = {
  auth: AuthState;
  login: (phone: string) => void;
  logout: () => void;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, phone: null });
  const [showModal, setShowModal] = useState(false);

  const login = (phone: string) => {
    setAuth({ isLoggedIn: true, phone });
    setShowModal(false);
  };
  const logout = () => setAuth({ isLoggedIn: false, phone: null });
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <AuthContext.Provider value={{ auth, login, logout, showModal, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
