const mongoose = require("mongoose");
const Member = require("../models/memberModel");

// Kết nối tới MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/assignment_final_MERN_stack_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Tạo các thành viên mới
async function createMembers() {
  try {
    const memberData1 = {
      memberName: "adminuser",
      password: "admin123", // Password sẽ được mã hóa trước khi lưu vào cơ sở dữ liệu
      name: "Admin User",
      isAdmin: true,
      status: true,
    };

    const memberData2 = {
      memberName: "customer1",
      password: "password123", // Password sẽ được mã hóa trước khi lưu vào cơ sở dữ liệu
      name: "Customer1",
      isAdmin: false,
      status: true,
    };

    const memberData3 = {
      memberName: "customer2",
      password: "password123", // Password sẽ được mã hóa trước khi lưu vào cơ sở dữ liệu
      name: "Customer2",
      isAdmin: false,
      status: true,
    };

    const newMember1 = new Member(memberData1);
    const newMember2 = new Member(memberData2);
    const newMember3 = new Member(memberData3);

    await newMember1.save();
    await newMember2.save();
    await newMember3.save();

    console.log("Members created successfully:");
    console.log("Admin Member:", newMember1);
    console.log("Customer1 Member:", newMember2);
    console.log("Customer2 Member:", newMember3);

    mongoose.connection.close(); // Đóng kết nối sau khi hoàn thành
  } catch (err) {
    console.error("Error creating members:", err);
  }
}

createMembers();
