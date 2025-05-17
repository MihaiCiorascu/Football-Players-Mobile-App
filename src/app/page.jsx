"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 32, border: "1px solid #ccc", borderRadius: 12, textAlign: "center" }}>
      <h1>Welcome to Football Players Web</h1>
      <button
        style={{ width: "100%", padding: 14, margin: "18px 0", background: "#0070f3", color: "white", border: "none", borderRadius: 6, fontSize: 18 }}
        onClick={() => router.push("/register")}
      >
        Register
      </button>
      <button
        style={{ width: "100%", padding: 14, margin: "18px 0", background: "#28a745", color: "white", border: "none", borderRadius: 6, fontSize: 18 }}
        onClick={() => router.push("/login")}
      >
        Login
      </button>
    </div>
  );
} 