// app/about/page.tsx
'use client';
import styles from '@/styles/About.module.css';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      {/* BANNER SECTION */}
      <section className={styles.banner}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>VỀ CÔNG TY FAÇADE</h1>
          <p className={styles.subtitle}>Giải pháp mặt dựng hiện đại – Đồng hành cùng mọi công trình</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className={styles.section}>
        <h2 className={styles.heading}>Tầm nhìn & Sứ mệnh</h2>
        <p>
          FAÇADE định hướng trở thành thương hiệu dẫn đầu trong ngành vật liệu mặt dựng tại Việt Nam và khu vực.
          Chúng tôi cam kết cung cấp những giải pháp tối ưu về thẩm mỹ, độ bền và hiệu suất thi công.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Giá trị cốt lõi</h2>
        <ul className={styles.list}>
          <li>Chất lượng – Uy tín – Trách nhiệm</li>
          <li>Luôn đồng hành cùng khách hàng</li>
          <li>Không ngừng cải tiến và sáng tạo</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Năng lực thi công</h2>
        <p>
          Đội ngũ kỹ thuật của chúng tôi có kinh nghiệm thi công hàng trăm công trình lớn nhỏ trên toàn quốc.
          Chúng tôi sử dụng hệ thống máy móc hiện đại, kiểm soát chất lượng chặt chẽ từ nhà máy đến công trường.
        </p>
        <Image
          src="/images/da1.jpg"
          alt="Công trình tiêu biểu"
          width={900}
          height={500}
          className={styles.image}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Thông tin liên hệ</h2>
        <p>
          Địa chỉ: 115C Nguyễn Ảnh Thủ TP. Hồ Chí Minh <br />
          Điện thoại: 0942.433.733 <br />
          Email: contact@facade.vn
        </p>
      </section>
    </div>
  );
}
