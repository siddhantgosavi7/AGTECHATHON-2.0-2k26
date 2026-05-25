import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [offline, setOffline] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [savedReports, setSavedReports] = useState([]);

  const notify = (message, type = 'success') => {
    const id = crypto.randomUUID();
    setToasts((items) => [...items, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((items) => items.filter((toast) => toast.id !== id));
    }, 3200);
  };

  const value = useMemo(
    () => ({
      darkMode,
      offline,
      savedReports,
      toasts,
      setDarkMode,
      setOffline,
      setSavedReports,
      notify,
    }),
    [darkMode, offline, savedReports, toasts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
