"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './MonitoredUsers.module.css';

export default function MonitoredUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [simulating, setSimulating] = useState(false);
  const router = useRouter();

  const fetchMonitoredUsers = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }
    fetch("/api/admin/monitored-users", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (res) => {
        if (res.status === 403) {
          setError("You are not authorized to view this page.");
          return;
        }
        if (!res.ok) {
          setError("Failed to fetch monitored users.");
          return;
        }
        const data = await res.json();
        setUsers(data);
      })
      .catch(() => setError("Failed to fetch monitored users."));
  };

  useEffect(() => {
    fetchMonitoredUsers();
  }, []);

  const simulateAttack = async () => {
    setSimulating(true);
    try {
      const response = await fetch('/api/admin/monitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: 100 }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to simulate attack');
      }
      alert('Attack simulated! Wait a few minutes for the background monitor to detect it.');
      fetchMonitoredUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setSimulating(false);
    }
  };

  if (error) return <div style={{ color: 'red', margin: '2rem' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ marginBottom: 24 }}>Monitored Users</h1>
      <button
        style={{
          marginBottom: 24,
          padding: "12px 24px",
          background: "#d9534f",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: simulating ? "not-allowed" : "pointer",
          fontWeight: "bold"
        }}
        onClick={simulateAttack}
        disabled={simulating}
      >
        {simulating ? "Simulating..." : "Simulate Attack"}
      </button>
      {users.length === 0 ? (
        <p>No suspicious users detected.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((u) => (
            <li key={u.id} style={{ marginBottom: 16, padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
              <strong>User ID:</strong> {u.userId}<br />
              <strong>Reason:</strong> {u.reason}<br />
              <strong>Detected At:</strong> {new Date(u.detectedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 