import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_PRODUCTS = gql`
  query {
    products(limit: 20) {
      items {
        id
        name
        price
        image
        inStock
      }
    }
  }
`;

export default function Products() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.products.items.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition p-4"
          >
            <img
              src={p.image || "https://via.placeholder.com/200"}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-lg font-semibold text-slate-800 mt-3">
              {p.name}
            </h3>

            <p className="text-slate-600 mb-2">₹{p.price}</p>

            <p className="text-sm mb-3">
              {p.inStock ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>

            <Link
              to={`/order/${p.id}`}
              className="bg-slate-600 hover:bg-slate-700 text-white text-center block py-2 rounded"
            >
              Order Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
