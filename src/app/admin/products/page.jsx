'use client';
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
    sold: 0
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Đảm bảo fetch lại dữ liệu mới nhất mỗi lần cần
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

  // Chọn file ảnh đại diện (base64)
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

  // Chọn file ảnh khi sửa
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
        sold: 0
      });
      await fetchProducts();
    } catch (err) {
      alert("Thêm sản phẩm thất bại!");
    }
  };

  // Khi nhấn Sửa, luôn lấy bản mới nhất từ products (tránh bị lỗi cache cũ)
  const handleEdit = (product) => {
    const latest = products.find(p => p._id === product._id) || product;
    setEditId(product._id);
    setEditForm({ ...latest });
  };

  // Lưu sửa sản phẩm
  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/products/${id}`, editForm);
      await fetchProducts();      // Phải chờ fetch xong!
      setEditId(null);            // Đóng form sau khi đã cập nhật xong!
    } catch (err) {
      alert("Sửa sản phẩm thất bại!");
    }
  };

  const handleCancelEdit = () => setEditId(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quản lý Sản phẩm</h1>
      <h2 className={styles.subtitle}>Thêm sản phẩm mới</h2>
      <form onSubmit={handleCreate} className={styles.form}>
        <input name="name" placeholder="Tên sản phẩm" value={form.name} onChange={handleChange} className={styles.input}/>
        <input name="slug" placeholder="URL thân thiện SEO (slug)" value={form.slug} onChange={handleChange} className={styles.input}/>
        <input name="price" type="number" placeholder="Giá (vnđ)" value={form.price} onChange={handleChange} className={styles.input}/>
        <input type="file" accept="image/*" onChange={handleFileChange} className={styles.input} style={{ padding: 0, minWidth: 180 }}/>
        {form.image && (
          <img src={form.image} alt="Ảnh sản phẩm" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, margin: '8px 0' }} />
        )}
        <input name="gallery" placeholder="URL ảnh mô tả (nhiều ảnh, ngăn cách dấu ,)" value={form.gallery} onChange={handleChange} className={styles.input}/>

        <div className={styles.textareaRow}>
          <textarea name="shortDesc" placeholder="Mô tả ngắn (SEO meta)" value={form.shortDesc} onChange={handleChange} className={styles.textarea} rows={2}/>
          <textarea name="description" placeholder="Mô tả chi tiết" value={form.description} onChange={handleChange} className={styles.textarea} rows={4}/>
        </div>
        <div className={styles.textareaRow}>
          <textarea name="specs" placeholder="Thông số kỹ thuật (mỗi dòng 1 mục)" value={form.specs} onChange={handleChange} className={styles.textarea} rows={3}/>
          <textarea name="features" placeholder="Công dụng nổi bật (mỗi dòng 1 mục)" value={form.features} onChange={handleChange} className={styles.textarea} rows={2}/>
          <textarea name="applications" placeholder="Ứng dụng đời sống (mỗi dòng 1 ý)" value={form.applications} onChange={handleChange} className={styles.textarea} rows={2}/>
        </div>
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
                <td className={styles.td} colSpan={4}>
                  <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                    <input name="name" value={editForm.name || ""} onChange={handleEditChange} className={styles.input} placeholder="Tên sản phẩm"/>
                    <input name="slug" value={editForm.slug || ""} onChange={handleEditChange} className={styles.input} placeholder="Slug"/>
                    <input name="price" value={editForm.price || ""} onChange={handleEditChange} className={styles.input} placeholder="Giá"/>
                    {/* Sửa ảnh đại diện */}
                    <input type="file" accept="image/*" onChange={handleEditFileChange} className={styles.input} style={{ padding: 0, minWidth: 180 }}/>
                    {editForm.image && (
                      <img src={editForm.image} alt="Ảnh sản phẩm" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, margin: '8px 0' }} />
                    )}
                    <input name="gallery" value={editForm.gallery || ""} onChange={handleEditChange} className={styles.input} placeholder="Ảnh mô tả"/>
                    <textarea name="shortDesc" value={editForm.shortDesc || ""} onChange={handleEditChange} className={styles.textarea} placeholder="Mô tả ngắn"/>
                    <textarea name="description" value={editForm.description || ""} onChange={handleEditChange} className={styles.textarea} placeholder="Mô tả chi tiết"/>
                    <textarea name="specs" value={editForm.specs || ""} onChange={handleEditChange} className={styles.textarea} placeholder="Thông số kỹ thuật"/>
                    <textarea name="features" value={editForm.features || ""} onChange={handleEditChange} className={styles.textarea} placeholder="Công dụng"/>
                    <textarea name="applications" value={editForm.applications || ""} onChange={handleEditChange} className={styles.textarea} placeholder="Ứng dụng"/>
                    <input name="sold" type="number" value={editForm.sold || 0} onChange={handleEditChange} className={styles.input} placeholder="Đã bán"/>
                    <div style={{display: "flex", gap: 10, marginTop: 8}}>
                      <button className={styles.btn} onClick={() => handleSaveEdit(p._id)}>Lưu</button>
                      <button className={styles.btn} onClick={handleCancelEdit}>Huỷ</button>
                    </div>
                  </div>
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
