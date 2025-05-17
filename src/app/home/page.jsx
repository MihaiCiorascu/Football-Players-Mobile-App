"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputDesign from "../../components/MainPage/InputDesign";

export default function UserHome() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
    } else {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload.role === "admin");
      } catch (e) {
        setIsAdmin(false);
      }
    }
  }, [router]);
  return (
    <div>
      <InputDesign />
    </div>
  );
} 