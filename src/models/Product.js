import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, text: true },
  description: { type: String, text: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  rating: { type: Number, default: 0 },
  popularity: { type: Number, default: 0 },
  image: String,
}, { timestamps: true });

/* ✅ Text search index (for search/filter feature) */
productSchema.index({ name: "text", description: "text" });

/* ✅ Compound indexes for high-performance filtering & sorting */
productSchema.index({ category: 1, price: 1, createdAt: -1 });
productSchema.index({ inStock: 1, price: 1 });
productSchema.index({ popularity: -1 });
productSchema.index({ rating: -1 });

/* ✅ Virtual ID for GraphQL */
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

/* ✅ Ensure virtuals work with toJSON & toObject */
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });
productSchema.plugin(mongooseLeanVirtuals);

export default mongoose.model("Product", productSchema);
