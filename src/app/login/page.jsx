"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../../styles/LoginPage.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", form);
      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));
      if (user.isAdmin) {
       
        router.push("/admin/admindashboard"); 
       
      } else {
        router.push("/");
      }
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <div className={styles["login-title"]}>Đăng nhập</div>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
          className={styles["login-input"]}
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className={styles["login-input"]}
        />
        <button type="submit" className={styles["login-button"]}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
