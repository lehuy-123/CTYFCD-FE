'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../../../styles/AdminProjects.module.css';
import { FiEdit3, FiTrash2, FiSave, FiPlus } from 'react-icons/fi';

interface Project {
  _id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>({
    _id: '',
    title: '',
    slug: '',
    image: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!form.title?.trim()) {
      setError('Vui lòng nhập tên dự án');
      return false;
    }
    if (!form.slug?.trim()) {
      setError('Vui lòng nhập slug URL');
      return false;
    }
    if (form.image && !isValidUrl(form.image)) {
      setError('URL hình ảnh không hợp lệ');
      return false;
    }
    setError(null);
    return true;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Lấy danh sách dự án từ server
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5001/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Lỗi lấy danh sách dự án:', err);
      setError('Không thể tải danh sách dự án. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Thêm mới hoặc cập nhật dự án
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    try {
      if (form._id) {
        await axios.put(`http://localhost:5001/api/projects/${form._id}`, form);
      } else {
        await axios.post('http://localhost:5001/api/projects', form);
      }
      setForm({ _id: '', title: '', slug: '', image: '', description: '' });
      fetchProjects();
    } catch (err) {
      console.error('Lỗi đăng/cập nhật dự án:', err);
      setError('Có lỗi xảy ra khi lưu dự án. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Xoá dự án
  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá dự án này?')) {
      try {
        await axios.delete(`http://localhost:5001/api/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Lỗi xoá dự án:', err);
      }
    }
  };

  // Sửa dự án: đổ dữ liệu lên form
  const handleEdit = (project: Project) => {
    setForm({
      _id: project._id,
      title: project.title,
      slug: project.slug,
      image: project.image,
      description: project.description,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>
          {form._id ? <FiEdit3 /> : <FiPlus />}
          {form._id ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
        </h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.formGroup}>
            <label className={styles.label}>Tên dự án</label>
            <input
              className={styles.input}
              placeholder="Nhập tên dự án..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Slug URL</label>
            <input
              className={styles.input}
              placeholder="ten-du-an (không dấu, có gạch nối)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Hình ảnh</label>
            <input
              className={styles.input}
              placeholder="URL hình ảnh"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Mô tả dự án</label>
            <textarea
              className={styles.textarea}
              placeholder="Nhập mô tả chi tiết về dự án..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              'Đang xử lý...'
            ) : form._id ? (
              <>
                <FiSave /> Cập nhật
              </>
            ) : (
              <>
                <FiPlus /> Thêm mới
              </>
            )}
          </button>
        </form>
      </div>

      <h2 className={styles.formTitle}>Danh sách dự án</h2>
      <div className={styles.projectGrid}>
        {projects.map((p) => (
          <div key={p._id} className={styles.projectCard}>
          {isValidUrl(p.image || '') ? (
  <div className={styles.imageContainer}>
    <Image
      src={p.image as string}
      alt={p.title}
      width={400}
      height={200}
      className={styles.projectImage}
    />
  </div>
) : (
  <div className={styles.imageContainer}>
    <Image
      src="/images/banner1.png"
      alt="Ảnh mặc định"
      width={400}
      height={200}
      className={styles.projectImage}
    />
  </div>
)}

            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{p.title}</h3>
              <p className={styles.projectDescription}>{p.description}</p>
              <div className={styles.actionButtons}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(p)}
                >
                  <FiEdit3 /> Sửa
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(p._id)}
                >
                  <FiTrash2 /> Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
