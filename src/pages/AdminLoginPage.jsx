"use client";
import { useState } from "react";
import styles from "@/styles/AdminLogin.module.css";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Tạm thời hardcode tài khoản
    if (username === "admin" && password === "123456") {
      alert("Đăng nhập thành công!");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Tài khoản hoặc mật khẩu sai!");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}
