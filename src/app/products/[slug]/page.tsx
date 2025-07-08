'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/ProductDetail.module.css';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  gallery: string;         // Chuỗi url ảnh, ngăn cách dấu phẩy (nếu có)
  shortDesc: string;
  description: string;
  specs: string;
  features: string;
  applications: string;
  sold: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Nếu muốn demo DỰ ÁN thì dùng tạm mảng này (sau này gọi API thực tế)
  const demoProjects = [
    { _id: "1", image: "/demo-project1.jpg", title: "Dự án FAÇADE Hà Nội" },
    { _id: "2", image: "/demo-project2.jpg", title: "Văn phòng cao tầng" }
  ];

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/slug/${slug}`);
        if (!response.ok) throw new Error('Không tìm thấy sản phẩm');
        const data = await response.json();
        setProduct(data);
      } catch {
        setError('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error || !product) return <div className={styles.error}>{error || 'Không tìm thấy sản phẩm'}</div>;

  // Tách gallery nếu có
  const gallery = product.gallery
    ? product.gallery.split(',').map(url => url.trim()).filter(Boolean)
    : [];

  return (
    <main className={styles.detailMain}>
      {/* PHẦN 1: Ảnh sản phẩm */}
      <div className={styles.left}>
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={320}
            height={320}
            className={styles.mainImg}
            style={{ objectFit: "cover", borderRadius: 12, marginBottom: 16 }}
          />
        )}
        {/* Nếu có gallery thì hiện thêm thumbnail */}
        {gallery.length > 0 && (
          <div className={styles.gallery}>
            {gallery.map((img, idx) => (
              <img key={idx} src={img} alt={`gallery-${idx}`} className={styles.thumbImg} />
            ))}
          </div>
        )}
      </div>

      {/* PHẦN 2: Nội dung sản phẩm */}
      <div className={styles.center}>
        <h1 className={styles.name}>{product.name}</h1>
        <div className={styles.meta}>
          <span className={styles.price}>Giá: {product.price.toLocaleString('vi-VN')} VNĐ</span>
          <span className={styles.sold}>Đã bán: {product.sold}</span>
        </div>
        <section className={styles.section}>
          <h2>Mô tả ngắn</h2>
          <p>{product.shortDesc}</p>
        </section>
        <section className={styles.section}>
          <h2>Mô tả chi tiết</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </section>
        {product.specs && (
          <section className={styles.section}>
            <h2>Thông số kỹ thuật</h2>
            <div dangerouslySetInnerHTML={{ __html: product.specs }} />
          </section>
        )}
        {product.features && (
          <section className={styles.section}>
            <h2>Tính năng</h2>
            <div dangerouslySetInnerHTML={{ __html: product.features }} />
          </section>
        )}
        {product.applications && (
          <section className={styles.section}>
            <h2>Ứng dụng</h2>
            <div dangerouslySetInnerHTML={{ __html: product.applications }} />
          </section>
        )}
      </div>

      {/* PHẦN 3: Dự án liên quan */}
      <aside className={styles.right}>
        <h3 className={styles.projectTitle}>Dự án đã thi công</h3>
        {demoProjects.map(project => (
          <div key={project._id} className={styles.projectCard}>
            <img src={project.image} alt={project.title} />
            <p>{project.title}</p>
          </div>
        ))}
      </aside>
    </main>
  );
}
