import styles from "@/styles/Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo Elval */}
        <div className={styles.elval}>
          <Image
            src="/images/elval.png" // hãy thay bằng logo đúng nếu có
            alt="ELVAL COLOUR"
            width={280}
            height={100}
          />
         
        </div>

        {/* Thông tin công ty */}
        <div className={styles.info}>
          <p><strong>CÔNG TY TNHH THƯƠNG MẠI GIẢI PHÁP FACADE</strong></p>
          <p>Số 115C Nguyễn Ảnh Thủ, Tổ 63, Khu phố 6, P. Trung Mỹ Tây, Q.12, TP.HCM</p>
          <p>Điện thoại: (+08) 283.636.2370 &nbsp; Fax: (+08) 283.636.2371</p>
          <p>Mã số thuế: 0313990323</p>
          <p>Tài khoản: 060134420653 tại Ngân hàng Sacombank – CN Quận 12</p>
        </div>

        {/* Icon mạng xã hội */}
        <div className={styles.socials}>
          <a href="#"><Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} /></a>
          <a href="#"><Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} /></a>
          <a href="#"><Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} /></a>
          <a href="#"><Image src="/icons/google.svg" alt="Google+" width={24} height={24} /></a>
        </div>
      </div>

      <div className={styles.copyright}>
        © 2019 CÔNG TY TNHH THƯƠNG MẠI GIẢI PHÁP FACADE – Web Design by Nina.vn
      </div>
    </footer>
  );
}
