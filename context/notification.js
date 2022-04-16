import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) { 
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if(notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;