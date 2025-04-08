'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const NetworkContext = createContext();

export function NetworkProvider({ children }) {
  // Initialize with the current online status
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? navigator.onLine : true
  );
  const [isServerAvailable, setIsServerAvailable] = useState(true);
  const [manualOffline, setManualOffline] = useState(false);
  const [manualServerDown, setManualServerDown] = useState(false);

  const checkServerAvailability = async () => {
    try {
      console.log('Checking server availability...');
      
      if (manualServerDown) {
        console.log('Manual server down enabled, returning false');
        setIsServerAvailable(false);
        return false;
      }
      
      const response = await fetch('/api/health', {
        method: 'HEAD',
        signal: AbortSignal.timeout(3000),
      });
      const available = response.ok;
      console.log('Server availability:', available);
      setIsServerAvailable(available);
      return available;
    } catch (error) {
      console.log('Server availability error:', error);
      setIsServerAvailable(false);
      return false;
    }
  };

  const toggleManualOffline = () => {
    setManualOffline(!manualOffline);
  };

  const toggleManualServerDown = () => {
    setManualServerDown(!manualServerDown);
  };

  const checkOnlineStatus = async () => {
    const navigatorOnline = navigator.onLine;
    console.log('Navigator online status:', navigatorOnline);

    try {
      const testResponse = await fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors',
        cache: 'no-store',
        signal: AbortSignal.timeout(3000)
      });
      console.log('Connection test successful');
      setIsOnline(true);
      return true;
    } catch (error) {
      console.log('Connection test failed:', error);
      setIsOnline(false);
      return false;
    }
  };

  useEffect(() => {
    console.log('NetworkContext mounted');
    
    const handleOnline = async () => {
      console.log('Browser online event triggered');
      const isOnline = await checkOnlineStatus();
      if (isOnline) {
        checkServerAvailability();
      }
    };

    const handleOffline = () => {
      console.log('Browser offline event triggered');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const initialCheck = async () => {
      const isOnline = await checkOnlineStatus();
      if (isOnline) {
        checkServerAvailability();
      }
    };
    initialCheck();

    const statusInterval = setInterval(async () => {
      const isOnline = await checkOnlineStatus();
      if (isOnline && !manualOffline) {
        checkServerAvailability();
      }
    }, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(statusInterval);
    };
  }, []);

  const effectiveOnlineStatus = isOnline && !manualOffline;

  return (
    <NetworkContext.Provider 
      value={{ 
        isOnline: effectiveOnlineStatus, 
        rawIsOnline: isOnline,
        isServerAvailable, 
        checkServerAvailability,
        toggleManualOffline,
        toggleManualServerDown,
        manualOffline,
        manualServerDown,
        checkOnlineStatus
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
} 