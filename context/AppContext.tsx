import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Workspace } from '../types';
import { MOCK_USERS, MOCK_WORKSPACES, authenticateUser } from '../services/mockApi';

interface AppContextType {
  currentUser: User | null;
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  switchWorkspace: (wid: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [workspaces] = useState<Workspace[]>(MOCK_WORKSPACES);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('projectops-auth') === 'true';
  });
  
  useEffect(() => {
    if (isAuthenticated) {
        // In a real app, you'd fetch the user profile from the server
        setCurrentUser(MOCK_USERS[0]);
        setCurrentWorkspace(MOCK_WORKSPACES[0]);
    } else {
        setCurrentUser(null);
        setCurrentWorkspace(null);
    }
  }, [isAuthenticated]);


  const login = async (email: string, pass: string): Promise<boolean> => {
    const success = await authenticateUser(email, pass);
    if(success) {
      localStorage.setItem('projectops-auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('projectops-auth');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };


  const switchWorkspace = (wid: string) => {
    const newWorkspace = workspaces.find(w => w.wid === wid);
    if (newWorkspace) {
      setCurrentWorkspace(newWorkspace);
    }
  };

  const value = {
    currentUser,
    currentWorkspace,
    workspaces,
    isAuthenticated,
    login,
    logout,
    switchWorkspace,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};