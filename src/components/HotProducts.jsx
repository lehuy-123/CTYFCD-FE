"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "@/styles/HotProducts.module.css";

export default function HotProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/products/hot")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi lấy sản phẩm hot:", err));
  }, []);

  return (
    <section className={styles.hotSection}>
      <h2 className={styles.hotTitle}>SẢN PHẨM NỔI BẬT</h2>
      <div className={styles.productGrid}>
        {products.length === 0 && <span>Chưa có sản phẩm nổi bật.</span>}
        {products.map((p) => (
          <Link
            href={`/products/${p.slug || p._id}`}
            className={styles.card}
            key={p._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {p.image ? (
              <img src={p.image} alt={p.name} className={styles.productImg} />
            ) : (
              <div className={styles.noImg}>No Image</div>
            )}
            <h3>{p.name}</h3>
            <p className={styles.price}>{Number(p.price).toLocaleString()}đ</p>
            <p className={styles.sold}>Đã bán: {p.sold}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
