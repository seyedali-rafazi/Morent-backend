const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    carGroup: { type: ObjectId, ref: "CarGroup", required: true },
    imageLink: { type: String, required: true },
    price: { type: Number, required: true },
    offPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    likes: { type: [ObjectId], ref: "User", default: [] },
    typecars: { type: String, required: true },
    capacity: { type: Number, required: true },
    steering: { type: String, required: true },
    gasoline: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Create a text index on the 'title' and 'description' fields
ProductSchema.index({ title: "text", description: "text" });

module.exports = {
  ProductModel: mongoose.model("Product", ProductSchema),
};
