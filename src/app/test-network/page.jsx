'use client';

import React from 'react';
import { useNetwork } from '../../context/NetworkContext';
import NetworkStatus from '../../components/NetworkStatus/NetworkStatus';

export default function TestNetworkPage() {
  const { 
    isOnline, 
    isServerAvailable, 
    checkServerAvailability,
    toggleManualOffline,
    toggleManualServerDown,
    manualOffline,
    manualServerDown
  } = useNetwork();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Network Status Test Page</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Status</h2>
        <p>Browser Online Status: <span className={isOnline ? 'text-green-500' : 'text-red-500'}>{isOnline ? 'Online' : 'Offline'}</span></p>
        <p>Server Available: <span className={isServerAvailable ? 'text-green-500' : 'text-amber-500'}>{isServerAvailable ? 'Available' : 'Unavailable'}</span></p>
        <p>Manual Offline Mode: <span className={manualOffline ? 'text-red-500' : 'text-green-500'}>{manualOffline ? 'Enabled' : 'Disabled'}</span></p>
        <p>Manual Server Down: <span className={manualServerDown ? 'text-amber-500' : 'text-green-500'}>{manualServerDown ? 'Enabled' : 'Disabled'}</span></p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test Controls</h2>
        <div className="flex gap-4">
          <button 
            onClick={toggleManualOffline}
            className={`px-4 py-2 rounded ${manualOffline ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            Toggle Offline Mode
          </button>
          
          <button 
            onClick={toggleManualServerDown}
            className={`px-4 py-2 rounded ${manualServerDown ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}
          >
            Toggle Server Down
          </button>
          
          <button 
            onClick={checkServerAvailability}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Check Server
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">NetworkStatus Component</h2>
        <div className="border p-4 rounded">
          <NetworkStatus />
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Use the "Toggle Offline Mode" button to simulate being offline</li>
          <li>Use the "Toggle Server Down" button to simulate server being down</li>
          <li>Use the "Check Server" button to manually check server availability</li>
          <li>Observe the NetworkStatus component below</li>
        </ol>
      </div>
    </div>
  );
} 