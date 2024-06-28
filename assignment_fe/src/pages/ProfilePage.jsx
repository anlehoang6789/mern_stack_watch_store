import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Panel, Button, Input } from "rsuite";
import FormGroup from "rsuite/esm/FormGroup";
import { useAuth } from "../components/AuthContext";

const ProfilePage = () => {
  const { memberId } = useAuth();
  console.log("Member ID:", memberId);
  const [user, setUser] = useState(null);

  // State để quản lý chỉnh sửa FullName
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/members/${memberId}`,
          { withCredentials: true } // Đảm bảo gửi cookie với request
        );
        const data = response.data;
        console.log("User data:", data);
        setUser(data.member);
        setFullName(data.member.name); // Assuming 'name' is the property you want to display
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (memberId) {
      fetchUserData();
    }
  }, [memberId]);

  // Hàm xử lý khi nhấn Edit Profile
  const handleEditProfile = () => {
    setEditMode(true);
  };

  // Hàm xử lý khi thay đổi FullName
  const handleChangeFullName = (value) => {
    setFullName(value);
  };

  // Hàm xử lý khi lưu thay đổi FullName
  const handleSaveFullName = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/members/${user._id}/edit-profile`,
        {
          newName: fullName,
        }
      );
      setUser({ ...user, name: response.data.updatedMember.name });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Hoặc có thể là một spinner để báo đang tải
  }

  return (
    <div className="mx-auto max-w-xl mt-8 min-h-screen">
      <Panel header="Thông tin cá nhân" bordered>
        <div className="mb-4">
          <p className="text-lg font-semibold">FullName</p>
          {editMode ? (
            <FormGroup>
              <Input
                value={fullName}
                onChange={handleChangeFullName}
                placeholder="Nhập họ tên của bạn"
              />
            </FormGroup>
          ) : (
            <p className="text-gray-600">{fullName}</p>
          )}
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Username</p>
          <p className="text-gray-600">{user.memberName}</p>
        </div>
        <div className="flex space-x-4">
          {editMode ? (
            <Button
              color="green"
              appearance="primary"
              onClick={handleSaveFullName}
            >
              Save
            </Button>
          ) : (
            <Button
              color="blue"
              appearance="primary"
              onClick={handleEditProfile}
            >
              Update Profile
            </Button>
          )}
          <Button color="cyan" appearance="primary">
            <Link to={"/change-password"}>Change Password</Link>
          </Button>
        </div>
      </Panel>
    </div>
  );
};

export default ProfilePage;
