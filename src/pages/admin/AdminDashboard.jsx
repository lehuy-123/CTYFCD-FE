"use client";
import styles from "@/styles/AdminDashboard.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <h1>Trang quản trị FAÇADE</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>🛍️ Quản lý Sản phẩm</h3>
          <p>Thêm, sửa, xoá sản phẩm đang bán.</p>
        </div>

        <div className={styles.card}>
          <h3>📦 Quản lý Đơn hàng</h3>
          <p>Xem và xử lý các đơn đặt hàng của khách.</p>
        </div>

        <div className={styles.card}>
          <h3>👤 Quản lý Tài khoản</h3>
          <p>Xem và chỉnh sửa thông tin admin.</p>
        </div>
      </div>
    </div>
  );
}
