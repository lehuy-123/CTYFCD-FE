"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/AdminProducts.module.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm("Xoá sản phẩm này?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // refresh list
    }
  };

  return (
    <div className={styles.container}>
      <h1>Quản lý Sản phẩm</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Đã bán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()}đ</td>
              <td>{p.sold}</td>
              <td>
                <button>Sửa</button>
                <button onClick={() => handleDelete(p._id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
