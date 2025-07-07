// src/app/products/[slug]/page.tsx
export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Chi tiết sản phẩm: {params.slug}</h1>
      <p>Thông tin đầy đủ sản phẩm sẽ được hiển thị ở đây.</p>
    </main>
  );
}
