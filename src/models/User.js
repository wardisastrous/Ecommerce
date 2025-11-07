import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
}, { timestamps: true });

// ✅ Virtual ID (important for GraphQL)
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// ✅ Ensure virtuals appear in JSON & GraphQL responses
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export default mongoose.model("User", userSchema);
