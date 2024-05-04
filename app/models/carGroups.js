const mongoose = require("mongoose");

const CarGroupsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["product", "comment", "post", "ticket", "cargroups"],
      default: "cargroups",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CarGroupsSchema.index({ title: "text", englishTitle: "text" });

module.exports = {
  CarGroupsSchemaModel: mongoose.model("CarGroup", CarGroupsSchema),
};
