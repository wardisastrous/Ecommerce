import { useState, useEffect } from "react";

export default function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    inStock: true,
  });

  // ✅ When editing, preload product data safely
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? "",
        price: product.price ?? "",
        inStock: product.inStock ?? true,
      });
    } else {
      setForm({
        name: "",
        price: "",
        inStock: true,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="border p-4 my-4 rounded bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">
        {product ? "Edit Product" : "Add Product"}
      </h3>

      <div className="mb-2">
        <label className="block text-sm">Name</label>
        <input
          name="name"
          className="border p-2 w-full"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm">Price</label>
        <input
          name="price"
          type="number"
          className="border p-2 w-full"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onSave(form)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
