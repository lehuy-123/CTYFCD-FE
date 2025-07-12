"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/AdminProducts.module.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    image: "",
    gallery: "",
    shortDesc: "",
    description: "",
    specs: "",
    features: "",
    applications: "",
    sold: 0,
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5001/api/products");
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (confirm("Xoá sản phẩm này?")) {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditForm((prev) => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/products", form);
      setForm({
        name: "",
        slug: "",
        price: "",
        image: "",
        gallery: "",
        shortDesc: "",
        description: "",
        specs: "",
        features: "",
        applications: "",
        sold: 0,
      });
      await fetchProducts();
    } catch (err) {
      alert("Thêm sản phẩm thất bại!");
    }
  };

  const handleEdit = (product) => {
    const latest = products.find((p) => p._id === product._id) || product;
    setEditId(product._id);
    setEditForm({ ...latest });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/products/${id}`, editForm);
      await fetchProducts();
      setEditId(null);
    } catch (err) {
      alert("Sửa sản phẩm thất bại!");
    }
  };

  const handleCancelEdit = () => setEditId(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quản lý Sản phẩm</h1>
      <h2 className={styles.subtitle}>Thêm sản phẩm mới</h2>
      <div style={{ overflowX: "auto" }}>
        <div className={styles.rowForm}>
          <form onSubmit={handleCreate} className={styles.form}>
            <input
              name="name"
              placeholder="Tên"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              name="slug"
              placeholder="Slug"
              value={form.slug}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              name="price"
              type="number"
              placeholder="Giá"
              value={form.price}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              name="sold"
              type="number"
              placeholder="Đã bán"
              value={form.sold}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              name="gallery"
              placeholder="Gallery"
              value={form.gallery}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.input}
            />
            {form.image && (
              <img src={form.image} alt="Ảnh" style={{ width: 64, height: 64 }} />
            )}
            <div className={styles.textareaRow}>
              <textarea
                name="shortDesc"
                placeholder="Mô tả ngắn"
                value={form.shortDesc}
                onChange={handleChange}
                className={styles.textarea}
              />
              <textarea
                name="description"
                placeholder="Mô tả chi tiết"
                value={form.description}
                onChange={handleChange}
                className={styles.textarea}
              />
              <textarea
                name="specs"
                placeholder="Thông số"
                value={form.specs}
                onChange={handleChange}
                className={styles.textarea}
              />
              <textarea
                name="features"
                placeholder="Công dụng"
                value={form.features}
                onChange={handleChange}
                className={styles.textarea}
              />
              <textarea
                name="applications"
                placeholder="Ứng dụng"
                value={form.applications}
                onChange={handleChange}
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Thêm
            </button>
          </form>
        </div>
      </div>

      {editId && (
        <div>
          <h2 className={styles.subtitle}>Sửa sản phẩm</h2>
          <div style={{ overflowX: "auto" }}>
            <div className={styles.rowForm}>
              <form className={styles.form}>
                <input
                  name="name"
                  value={editForm.name || ""}
                  onChange={handleEditChange}
                  className={styles.input}
                  placeholder="Tên"
                />
                <input
                  name="slug"
                  value={editForm.slug || ""}
                  onChange={handleEditChange}
                  className={styles.input}
                  placeholder="Slug"
                />
                <input
                  name="price"
                  type="number"
                  value={editForm.price || ""}
                  onChange={handleEditChange}
                  className={styles.input}
                  placeholder="Giá"
                />
                <input
                  name="sold"
                  type="number"
                  value={editForm.sold || 0}
                  onChange={handleEditChange}
                  className={styles.input}
                  placeholder="Đã bán"
                />
                <input
                  name="gallery"
                  value={editForm.gallery || ""}
                  onChange={handleEditChange}
                  className={styles.input}
                  placeholder="Gallery"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditFileChange}
                  className={styles.input}
                />
                {editForm.image && (
                  <img
                    src={editForm.image}
                    alt="Ảnh"
                    style={{ width: 64, height: 64 }}
                  />
                )}
                <div className={styles.textareaRow}>
                  <textarea
                    name="shortDesc"
                    value={editForm.shortDesc || ""}
                    onChange={handleEditChange}
                    className={styles.textarea}
                    placeholder="Mô tả ngắn"
                  />
                  <textarea
                    name="description"
                    value={editForm.description || ""}
                    onChange={handleEditChange}
                    className={styles.textarea}
                    placeholder="Mô tả chi tiết"
                  />
                  <textarea
                    name="specs"
                    value={editForm.specs || ""}
                    onChange={handleEditChange}
                    className={styles.textarea}
                    placeholder="Thông số"
                  />
                  <textarea
                    name="features"
                    value={editForm.features || ""}
                    onChange={handleEditChange}
                    className={styles.textarea}
                    placeholder="Công dụng"
                  />
                  <textarea
                    name="applications"
                    value={editForm.applications || ""}
                    onChange={handleEditChange}
                    className={styles.textarea}
                    placeholder="Ứng dụng"
                  />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    className={styles.btn}
                    onClick={() => handleSaveEdit(editId)}
                  >
                    Lưu
                  </button>
                  <button className={styles.btn} onClick={handleCancelEdit}>
                    Huỷ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
          {products.map((p) => (
            <tr key={p._id}>
              <td className={styles.td}>{p.name}</td>
              <td className={styles.td}>{Number(p.price).toLocaleString()}đ</td>
              <td className={styles.td}>{p.sold}</td>
              <td className={styles.td}>
                <button className={styles.btn} onClick={() => handleEdit(p)}>
                  Sửa
                </button>
                <button className={styles.btn} onClick={() => handleDelete(p._id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}