const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = require("./commentModel"); // Import commentSchema

const watchSchema = new Schema(
  {
    watchName: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    Automatic: { type: Boolean, default: false },
    watchDescription: { type: String, required: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    comments: [commentSchema], // Nhúng commentSchema vào watchSchema
  },
  { timestamps: true }
);

const Watch = mongoose.model("Watch", watchSchema);

module.exports = Watch;
