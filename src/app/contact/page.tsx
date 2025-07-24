'use client';
import styles from '@/styles/Contact.module.css';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <section className={styles.contactSection}>
      <h1 className={styles.title}>Liên hệ với FAÇADE</h1>
      <p className={styles.subtitle}>Chúng tôi luôn sẵn sàng lắng nghe bạn.</p>

      <div className={styles.grid}>
        <div className={styles.info}>
          <h2>Thông tin liên hệ</h2>
          <p><strong>Địa chỉ:</strong> 115C Đường Nguyễn Ảnh Thủ, Quận 12, TP.HCM</p>
          <p><strong>Điện thoại:</strong> 0909 999 999</p>
          <p><strong>Email:</strong> contact@facade.vn</p>
          <p><strong>Website:</strong> www.facade.vn</p>
          <p><strong>Giờ làm việc:</strong> Thứ 2 - Thứ 7 (08:00 - 17:00)</p>
        </div>

        <form className={styles.form}>
          <h2>Gửi tin nhắn</h2>
          <input type="text" placeholder="Họ tên của bạn" required />
          <input type="email" placeholder="Email của bạn" required />
          <textarea placeholder="Nội dung tin nhắn" required />
          <button type="submit">Gửi liên hệ</button>
        </form>
      </div>

      <div className={styles.mapWrapper}>
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18..."
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
