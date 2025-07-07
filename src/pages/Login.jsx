"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      alert("Đăng nhập thành công!");
      // Lưu token nếu có
    } catch (err) {
      alert("Đăng nhập thất bại!");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Đăng nhập</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>
        Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link>
      </p>
    </div>
  );
}
