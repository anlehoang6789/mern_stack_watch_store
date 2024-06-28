const mongoose = require("mongoose");
const Brand = require("../models/brandModel");

// Kết nối tới MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/assignment_final_MERN_stack_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Tạo một số thương hiệu
const brandsData = [
  { brandName: "Rolex" },
  { brandName: "Omega" },
  { brandName: "Seiko" },
];

// Lưu các thương hiệu vào cơ sở dữ liệu
async function seedBrands() {
  try {
    await Brand.deleteMany(); // Xóa hết dữ liệu cũ
    await Brand.insertMany(brandsData); // Thêm dữ liệu mới
    console.log("Brands seeded successfully");
    mongoose.connection.close(); // Đóng kết nối sau khi hoàn thành
  } catch (err) {
    console.error("Error seeding brands:", err);
  }
}

seedBrands();
