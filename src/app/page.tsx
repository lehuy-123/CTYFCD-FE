import styles from "@/styles/Home.module.css";
import HotProducts from "@/components/HotProducts"; // 👈 import sản phẩm hot
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.textOverlay}>
          <h1 className={styles.fadeInTitle}>GIẢI PHÁP MẶT DỰNG FAÇADES</h1>
          <p className={styles.fadeInSubtitle}>
            Giải pháp xây dựng hiện đại – Uy tín – Chất lượng
          </p>
        </div>
      </section>

      {/* HOT PRODUCTS SECTION */}
      <HotProducts />

      {/* COMPANY BANNER SECTION */}
<section className={styles.companyBanner}>
  <div className={styles.bannerWrapper}>
    <Image
      src="/images/bannernew.png"
      alt="Giới thiệu công ty FAÇADE"
      fill
      priority
      className={styles.bannerImage}
    />
  </div>
</section>

    </div>
  );
}
