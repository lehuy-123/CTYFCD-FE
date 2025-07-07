"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/HotProducts.module.css";

export default function HotProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products?sortBy=sold&limit=5")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi lấy sản phẩm:", err));
  }, []);

  return (
    <section className={styles.hotSection}>
      <h2 className={styles.hotTitle}>SẢN PHẨM NỔI BẬT</h2>
      <div className={styles.productGrid}>
        {products.map((p) => (
          <div className={styles.card} key={p._id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price.toLocaleString()}đ</p>
          </div>
        ))}
      </div>
    </section>
  );
}
