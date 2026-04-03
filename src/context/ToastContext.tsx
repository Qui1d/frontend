import { createContext, useCallback, useState } from 'react';
import type { ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((text: string) => {
    setMessage(text);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {visible && (
        <div className="toast">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};