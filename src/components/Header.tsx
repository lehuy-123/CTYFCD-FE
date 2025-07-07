import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
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
        <span>🔍</span>
        <span>🔒</span>
        <span>🇻🇳 🇺🇸 🇨🇦</span>
        <Link href="/login" className={styles.loginButton}>Đăng nhập</Link>
      </div>
    </header>
  );
}
