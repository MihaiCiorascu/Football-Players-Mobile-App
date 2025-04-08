'use client';

import React, { useEffect, useState } from 'react';
import { useNetwork } from '../../context/NetworkContext';
import styles from './NetworkStatus.module.css';

export default function NetworkStatus() {
  const { isOnline, rawIsOnline, isServerAvailable, manualOffline, checkOnlineStatus } = useNetwork();
  const [localIsOnline, setLocalIsOnline] = useState(rawIsOnline);
  const [debugInfo, setDebugInfo] = useState('');

  // Check online status directly from the browser
  const checkBrowserOnlineStatus = () => {
    const online = navigator.onLine;
    const connectionType = navigator.connection ? navigator.connection.effectiveType : 'unknown';
    const connectionDownlink = navigator.connection ? navigator.connection.downlink : 'unknown';
    
    console.log('NetworkStatus direct check - navigator.onLine:', online);
    console.log('Connection type:', connectionType);
    console.log('Connection downlink:', connectionDownlink);
    
    const info = `Online: ${online}, Connection: ${connectionType}, Downlink: ${connectionDownlink}`;
    setDebugInfo(info);
    
    setLocalIsOnline(online);
    return online;
  };

  useEffect(() => {
    console.log('NetworkStatus rendered, isOnline:', isOnline, 'rawIsOnline:', rawIsOnline, 'localIsOnline:', localIsOnline, 'isServerAvailable:', isServerAvailable, 'manualOffline:', manualOffline);
    
    checkBrowserOnlineStatus();
    
    const intervalId = setInterval(() => {
      checkBrowserOnlineStatus();
    }, 2000);
    
    const handleOnline = () => {
      console.log('Browser online event triggered in NetworkStatus');
      checkBrowserOnlineStatus();
    };
    
    const handleOffline = () => {
      console.log('Browser offline event triggered in NetworkStatus');
      checkBrowserOnlineStatus();
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline, rawIsOnline, isServerAvailable, manualOffline]);

  const shouldShowOffline = !localIsOnline || manualOffline;
  
  const shouldShowServerDown = localIsOnline && !isServerAvailable && !manualOffline;

  if (!shouldShowOffline && !shouldShowServerDown) {
    console.log('NetworkStatus: All systems operational, not displaying');
    return null;
  }

  console.log('NetworkStatus: Displaying status message, offline:', shouldShowOffline, 'server down:', shouldShowServerDown);
  return (
    <div className={styles.statusContainer}>
      <div className={styles.statusContent}>
        {shouldShowOffline && (
          <div className={styles.offlineStatus}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.statusIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728m-4.95-4.95a3 3 0 104.243-4.243m-4.243 4.243L5.636 5.636M16.243 7.757a6 6 0 00-8.486 8.486m8.486-8.486L5.636 18.364"
              />
            </svg>
            <span>You are offline</span>
          </div>
        )}

        {shouldShowServerDown && (
          <div className={styles.serverDownStatus}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.statusIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Server is unavailable</span>
          </div>
        )}
        
        {/* Debug info - only visible in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className={styles.debugInfo}>
            <small>{debugInfo}</small>
          </div>
        )}
      </div>
    </div>
  );
} 