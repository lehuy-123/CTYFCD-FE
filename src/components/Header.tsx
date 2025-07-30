'use client';
import { useEffect, useState } from "react";
import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import { FiMenu, FiX } from 'react-icons/fi';

type User = {
  id: string;
  username: string;
  isAdmin: boolean;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* Logo trái */}
      <div className={styles.logo}>
        <Image
          src="/images/logo.png"
          alt="FCD logo"
          width={40}
          height={40}
          className={styles.logoIcon}
        />
        <span className={styles.logoText}>
          {"ALU-FACADE".split("").map((char, index) => (
            <span
              key={index}
              className={styles.char}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>

      {/* Nút menu mobile */}
      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Menu giữa */}
      <nav className={`${styles.nav} ${menuOpen ? styles.showNav : ''}`}>
        <span className={`${styles.menuItem} ${pathname === '/' ? styles.active : ''}`} onClick={() => handleNavigate("/")}>Trang chủ</span>
        <span className={`${styles.menuItem} ${pathname === '/about' ? styles.active : ''}`} onClick={() => handleNavigate("/about")}>Giới thiệu</span>
        <span className={`${styles.menuItem} ${pathname === '/products' ? styles.active : ''}`} onClick={() => handleNavigate("/products")}>Sản phẩm</span>
        <span className={`${styles.menuItem} ${pathname === '/projects' ? styles.active : ''}`} onClick={() => handleNavigate("/projects")}>Dự án</span>
        <span className={`${styles.menuItem} ${pathname === '/contact' ? styles.active : ''}`} onClick={() => handleNavigate("/contact")}>Liên hệ</span>
      </nav>

      {/* Góc phải */}
      <div className={styles.icons}>
        {user?.isAdmin && (
          <button className={styles.adminBtn} onClick={() => handleNavigate("/admin/admindashboard")}>Admin</button>
        )}
        {pathname?.startsWith("/admin") && (
          <button className={styles.homeBtn} onClick={() => handleNavigate("/")}>Trang chủ</button>
        )}
        {user ? (
          <span className={styles.userGreeting}>Xin chào, {user.username}</span>
        ) : (
          <Link href="/login" className={styles.loginButton}>Đăng nhập</Link>
        )}
      </div>
    </header>
  );
}
