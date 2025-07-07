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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
