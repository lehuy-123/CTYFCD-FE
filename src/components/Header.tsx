'use client';
import { useEffect, useState } from "react";
import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";

// Định nghĩa kiểu dữ liệu cho user
type User = {
  id: string;
  username: string;
  isAdmin: boolean;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Có thể là string | null

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className={styles.header}>
      {/* Logo trái */}
      <div className={styles.logo}>
        <Image src="/images/logo.png" alt="FCD logo" width={40} height={40} />
        <span>FAÇADE</span>
      </div>

      {/* Menu giữa */}
      <nav className={styles.nav}>
        <Link href="/">Trang chủ</Link>
        <Link href="/about">Giới thiệu</Link>
        <Link href="/projects">Sản Phẩm</Link>
        <Link href="/products">Dự Án</Link>
        <Link href="/contact">Liên hệ</Link>
      </nav>

      {/* Biểu tượng + đăng nhập bên phải */}
      <div className={styles.icons}>
       
        <span>🇻🇳 🇺🇸 </span>
        {user?.isAdmin && (
          <button
            className={styles.adminBtn}
            onClick={() => router.push("/admin/admindashboard")}
          >
            Admin Dashboard
          </button>
        )}
        {/* Chỉ hiện nút Trang chủ nếu đang ở /admin */}
        {pathname && pathname.startsWith("/admin") && (
          <button
            className={styles.homeBtn}
            onClick={() => router.push("/")}
          >
            Trang chủ
          </button>
        )}
        {user ? (
          <span style={{ marginLeft: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
            Xin chào, {user.username}
          </span>
        ) : (
          <Link href="/login" className={styles.loginButton}>Đăng nhập</Link>
        )}
      </div>
    </header>
  );
}
