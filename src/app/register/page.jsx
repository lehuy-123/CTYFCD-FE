"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Đăng ký thành công!");
      router.push("/login");
    } catch (err) {
      alert("Đăng ký thất bại. Tài khoản đã tồn tại?");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Tên đăng nhập" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
        <button type="submit">Đăng ký</button>
        <p>Đã có tài khoản? <Link href="/login">Đăng nhập</Link></p>
      </form>
    </div>
  );
}
