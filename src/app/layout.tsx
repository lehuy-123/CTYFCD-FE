// app/layout.tsx
import '../styles/global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Công ty Xây dựng FAÇADE',
  description: 'Giải pháp mặt dựng & vật liệu xây dựng cao cấp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* ✅ Gắn font Google đẹp và mềm mại hơn (Lora) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "'Lora', serif" }}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
