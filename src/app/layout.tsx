import '../styles/global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Công ty Xây dựng FAÇADE',
  description: 'Giải pháp mặt dựng & vật liệu xây dựng cao cấp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        {/* ✅ Nhúng font Playfair Display */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
