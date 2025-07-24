import styles from "@/styles/Home.module.css";
import HotProducts from "@/components/HotProducts";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      {/* HERO SECTION - dùng layout responsive để ảnh không bị crop */}
      <section className={styles.heroImageWrapper}>
        <Image
          src="/images/new.jpg"

          alt="Banner công ty FAÇADE"
          width={1700}      // ✅ thay bằng đúng kích thước thật của ảnh nếu khác
          height={400}
          priority
          className={styles.heroImage}
        />
      </section>

      {/* HOT PRODUCTS SECTION */}
      <HotProducts />

      {/* COMPANY BANNER SECTION */}
      <section className={styles.companyBanner}>
        <div className={styles.bannerWrapper}>
          <Image
            src="/images/bannernew.png?v=1"

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
