'use client';

import styles from '@/styles/ProductGrid.module.css';
import ProductCard from '../../components/ProductCard';


export default function ProductListPage() {
  return (
    <main className={styles.products}>
      <h2>Danh sách sản phẩm</h2>
      <div className={styles.productGrid}>
        {[1, 2, 3, 4].map((i) => (
          <ProductCard
            key={i}
            name={`Sản phẩm mẫu ${i}`}
            price={1500000}
            image="/images/banner1.png"

          />
        ))}
      </div>
    </main>
  );
}
