import { gql, useQuery } from "@apollo/client";

const GET_MY_ORDERS = gql`
  query GetMyOrders {
    orders {
      items {
        id
        totalAmount
        status
        createdAt
        items {
          quantity
          product {
            name
          }
        }
      }
    }
  }
`;

export default function MyOrders() {
  const { data, loading, error } = useQuery(GET_MY_ORDERS);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error.message}</p>;

  // ✅ Safe access using optional chaining
  const orders = data?.orders?.items ?? [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-slate-600">No orders found yet.</p>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-slate-200 shadow-sm rounded-lg p-4 mb-4"
        >
          <p className="font-semibold text-slate-800">
            Total: ₹{order.totalAmount}
          </p>

          <p className="text-sm text-slate-600 mb-2">
            Status: <b>{order.status}</b>
          </p>

          <ul className="text-slate-700 text-sm pl-5 list-disc">
            {order.items.map((i, index) => (
              <li key={index}>
                {i.quantity} × {i.product?.name || "Product removed"}
              </li>
            ))}
          </ul>

          <p className="text-xs text-slate-500 mt-2">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
