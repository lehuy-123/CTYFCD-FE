'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/AdminProducts.module.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", sold: 0 });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", image: "", sold: 0 });

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

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
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

  const handleEdit = (product) => {
    setEditId(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      image: product.image,
      sold: product.sold || 0,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, editForm);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      alert("Sửa sản phẩm thất bại!");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quản lý Sản phẩm</h1>

      <h2 className={styles.subtitle}>Thêm sản phẩm mới</h2>
      <form onSubmit={handleCreate} className={styles.form}>
        <input
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="price"
          type="number"
          placeholder="Giá (vnđ)"
          value={form.price}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="image"
          placeholder="URL ảnh"
          value={form.image}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>Thêm</button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Tên</th>
            <th className={styles.th}>Giá</th>
            <th className={styles.th}>Đã bán</th>
            <th className={styles.th}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) =>
            editId === p._id ? (
              <tr key={p._id}>
                <td className={styles.td}>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                </td>
                <td className={styles.td}>
                  <input
                    name="price"
                    type="number"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                </td>
                <td className={styles.td}>
                  <input
                    name="sold"
                    type="number"
                    value={editForm.sold}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                </td>
                <td className={styles.td}>
                  <button className={styles.btn} onClick={() => handleSaveEdit(p._id)}>Lưu</button>
                  <button className={styles.btn} onClick={handleCancelEdit}>Huỷ</button>
                </td>
              </tr>
            ) : (
              <tr key={p._id}>
                <td className={styles.td}>{p.name}</td>
                <td className={styles.td}>{Number(p.price).toLocaleString()}đ</td>
                <td className={styles.td}>{p.sold}</td>
                <td className={styles.td}>
                  <button className={styles.btn} onClick={() => handleEdit(p)}>Sửa</button>
                  <button className={styles.btn} onClick={() => handleDelete(p._id)}>Xoá</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
