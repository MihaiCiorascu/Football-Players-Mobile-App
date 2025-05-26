"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState(null);
  const [twoFactorSecret, setTwoFactorSecret] = useState(null);
  const [otpauthUrl, setOtpauthUrl] = useState(null);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess(true);
        setQrCodeDataURL(data.qrCodeDataURL || null);
        setTwoFactorSecret(data.twoFactorSecret || null);
        setOtpauthUrl(data.otpauthUrl || null);
        setShowLoginButton(true);
      }
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
        <label>Role</label>
        <select value={role} onChange={e => setRole(e.target.value)} style={{ width: "100%", marginBottom: 12 }}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={{ width: "100%", padding: 10, background: "#0070f3", color: "white", border: "none", borderRadius: 4 }}>Register</button>
      </form>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      {success && (
        <div style={{ color: "green", marginTop: 10 }}>
          Registration successful!<br />
          <b>Two-Factor Authentication is enabled.</b><br />
          Please scan the QR code below with your authenticator app (Google Authenticator, Authy, etc.) and save your secret.<br />
          {qrCodeDataURL && (
            <div style={{ margin: '16px 0' }}>
              <img src={qrCodeDataURL} alt="2FA QR Code" style={{ width: 200, height: 200 }} /><br />
              <small>Secret: <code>{twoFactorSecret}</code></small><br />
              <a href={otpauthUrl} target="_blank" rel="noopener noreferrer">Open in Authenticator App</a>
            </div>
          )}
          <div style={{ marginTop: 10 }}>
            After you have scanned the QR code and set up your authenticator app, continue to login.
          </div>
          {showLoginButton && (
            <button onClick={() => router.push('/login')} style={{ marginTop: 16, width: '100%', padding: 10, background: '#0070f3', color: 'white', border: 'none', borderRadius: 4 }}>
              Continue to Login
            </button>
          )}
        </div>
      )}
    </div>
  );
} 