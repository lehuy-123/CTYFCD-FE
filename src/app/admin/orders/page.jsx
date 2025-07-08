"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      alert("Lỗi tải đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn muốn xoá đơn hàng này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        fetchOrders();
      } catch (err) {
        alert("Xoá đơn hàng thất bại!");
      }
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12 }}>
      <h1 style={{ fontSize: 26, marginBottom: 20 }}>Quản lý Đơn hàng</h1>
      {loading ? (
        <div>Đang tải đơn hàng...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
          <thead>
            <tr>
              <th style={{ padding: 12, border: "1px solid #eee", background: "#f5f7fa" }}>Khách hàng</th>
              <th style={{ padding: 12, border: "1px solid #eee", background: "#f5f7fa" }}>Sản phẩm</th>
              <th style={{ padding: 12, border: "1px solid #eee", background: "#f5f7fa" }}>Tổng tiền</th>
              <th style={{ padding: 12, border: "1px solid #eee", background: "#f5f7fa" }}>Trạng thái</th>
              <th style={{ padding: 12, border: "1px solid #eee", background: "#f5f7fa" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 16 }}>Chưa có đơn hàng nào.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ padding: 12, border: "1px solid #eee" }}>{order.customerName}</td>
                  <td style={{ padding: 12, border: "1px solid #eee" }}>
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td style={{ padding: 12, border: "1px solid #eee" }}>{Number(order.total).toLocaleString()}đ</td>
                  <td style={{ padding: 12, border: "1px solid #eee" }}>{order.status || "Chưa xử lý"}</td>
                  <td style={{ padding: 12, border: "1px solid #eee" }}>
                    <button
                      style={{
                        background: "#d32f2f",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 14px",
                        cursor: "pointer"
                      }}
                      onClick={() => handleDelete(order._id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
