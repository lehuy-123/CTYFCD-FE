import styles from '@/styles/ProductGrid.module.css';

export default function ProductCard({ name, price, image }: { name: string; price: number; image: string }) {
  return (
    <div className={styles.productCard}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className={styles.price}>{price.toLocaleString()} đ</p>
    </div>
  );
}
