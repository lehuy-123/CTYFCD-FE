import Image from 'next/image';

// ✅ Hàm fetch API an toàn với kiểm tra lỗi
async function getProjects() {
  try {
    const res = await fetch('http://localhost:5001/api/projects', {
      cache: 'no-store',
    });

   
    if (!res.ok) {
      console.error("Lỗi khi fetch API:", res.statusText);
      return [];
    }



    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Không thể gọi API dự án:", err);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dự Án Đã Thực Hiện</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500">Hiện chưa có dự án nào được đăng.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="shadow-md rounded-lg border hover:shadow-xl transition overflow-hidden"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Không có ảnh
                </div>
              )}

              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">{p.title}</h2>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
