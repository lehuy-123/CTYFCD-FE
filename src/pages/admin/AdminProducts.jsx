"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/AdminProducts.module.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", sold: 0 });

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
      fetchProducts();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", form);
      setForm({ name: "", price: "", image: "", sold: 0 });
      fetchProducts();
    } catch (err) {
      alert("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Quản lý Sản phẩm</h1>

      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleCreate} className={styles.form}>
        <input
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Giá (vnđ)"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="URL ảnh"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit">Thêm</button>
      </form>

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
              <td>{Number(p.price).toLocaleString()}đ</td>
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
