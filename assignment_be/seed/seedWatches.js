const mongoose = require("mongoose");
const Watch = require("../models/watchesModel");
const Brand = require("../models/brandModel");

// Kết nối tới MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/assignment_final_MERN_stack_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Tìm thương hiệu theo tên
async function findBrandByName(brandName) {
  try {
    return await Brand.findOne({ brandName });
  } catch (err) {
    console.error("Error finding brand:", err);
  }
}

// Tạo một sản phẩm đồng hồ mới
async function createWatch() {
  try {
    const brand = await findBrandByName("Rolex"); // Thay đổi tên thương hiệu tại đây
    if (!brand) {
      throw new Error("Brand not found");
    }

    const watchData = {
      watchName: "Rolex Submariner",
      image: "rolex.jpg",
      price: 10000,
      Automatic: true,
      watchDescription: "Iconic diving watch from Rolex",
      brand: brand._id,
      comments: [], // Bắt đầu với mảng comment trống
    };

    const newWatch = new Watch(watchData);
    await newWatch.save();
    console.log("Watch created successfully:", newWatch);
    mongoose.connection.close(); // Đóng kết nối sau khi hoàn thành
  } catch (err) {
    console.error("Error creating watch:", err);
  }
}

createWatch();
