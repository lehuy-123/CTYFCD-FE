"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/AdminDashboard.module.css";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      alert("Bạn không có quyền truy cập trang quản trị!");
      router.push("/login");
    }
  }, []);

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <h1>Trang quản trị FAÇADE</h1>

      <div className={styles.grid}>
        <div
          className={styles.card}
          style={{ cursor: "pointer" }}
          onClick={() => handleNavigate("/admin/products")}
        >
          <h3>🛍️ Quản lý Sản phẩm</h3>
          <p>Thêm, sửa, xoá sản phẩm đang bán.</p>
        </div>

        <div
          className={styles.card}
          style={{ cursor: "pointer" }}
          onClick={() => handleNavigate("/admin/orders")}
        >
          <h3>📦 Quản lý Đơn hàng</h3>
          <p>Xem và xử lý các đơn đặt hàng của khách.</p>
        </div>

        <div
          className={styles.card}
          style={{ cursor: "pointer" }}
          onClick={() => handleNavigate("/admin/accounts")}
        >
          <h3>👤 Quản lý Tài khoản</h3>
          <p>Xem và chỉnh sửa thông tin admin.</p>
        </div>

        <div
          className={styles.card}
          style={{ cursor: "pointer" }}
          onClick={() => handleNavigate("/admin/projects")}
        >
          <h3>🏗️ Quản lý Dự án</h3>
          <p>Đăng bài, chỉnh sửa và xoá các dự án đã thực hiện.</p>
        </div>
      </div>
    </div>
  );
}