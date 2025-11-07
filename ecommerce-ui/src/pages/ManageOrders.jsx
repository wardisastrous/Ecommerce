import { gql, useQuery, useMutation } from "@apollo/client";

const GET_ORDERS = gql`
  query GetAllOrders($limit: Int, $offset: Int) {
    orders(limit: $limit, offset: $offset) {
      totalCount
      items {
        id
        totalAmount
        status
      }
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export default function ManageOrders() {
  const { data, loading } = useQuery(GET_ORDERS, {
    variables: { limit: 20, offset: 0 },
  });

  const [updateStatus] = useMutation(UPDATE_STATUS, {
    refetchQueries: [{ query: GET_ORDERS, variables: { limit: 20, offset: 0 } }],
  });

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  const orders = data.orders.items;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-800">🧾 Manage Orders</h3>
        <span className="text-gray-600 text-sm">{orders.length} orders</span>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">Order #{order.id}</p>
                <p className="text-gray-700 text-sm mt-1">
                  Total: <b>₹{order.totalAmount}</b>
                </p>

                {/* Status Badge */}
                <span
                  className={`
                    inline-block mt-2 px-2 py-1 text-xs rounded font-medium
                    ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "paid"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-700"
                    }
                  `}
                >
                  {order.status}
                </span>
              </div>

              {/* Status Dropdown */}
              <select
                onChange={(e) =>
                  updateStatus({ variables: { id: order.id, status: e.target.value } })
                }
                defaultValue={order.status}
                className="border px-3 py-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm transition"
              >
                <option value="pending">pending</option>
                <option value="paid">paid</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
