"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TwoFactorPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || (typeof window !== 'undefined' && localStorage.getItem("pending2faUserId"));
  const username = searchParams.get("username") || (typeof window !== 'undefined' && localStorage.getItem("pending2faUsername"));
  const password = searchParams.get("password") || (typeof window !== 'undefined' && localStorage.getItem("pending2faPassword"));

  useEffect(() => {
    if (userId) localStorage.setItem("pending2faUserId", userId);
    if (username) localStorage.setItem("pending2faUsername", username);
    if (password) localStorage.setItem("pending2faPassword", password);
  }, [userId, username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Re-attempt login with 2FA code
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, twoFactorToken: code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "2FA failed");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.removeItem("pending2faUserId");
        localStorage.removeItem("pending2faUsername");
        localStorage.removeItem("pending2faPassword");
        router.push("/home");
      }
    } catch (err) {
      setError("2FA failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Two-Factor Authentication</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter 6-digit code</label>
        <input
          value={code}
          onChange={e => setCode(e.target.value)}
          required
          pattern="[0-9]{6}"
          maxLength={6}
          style={{ width: "100%", marginBottom: 12 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, background: "#0070f3", color: "white", border: "none", borderRadius: 4 }} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </div>
  );
} 