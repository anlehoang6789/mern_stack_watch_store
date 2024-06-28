import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Panel, Button, Input, Form, Notification, toaster } from "rsuite";
import { useAuth } from "../components/AuthContext";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { memberId } = useAuth();
  const navigate = useNavigate();

  const handleSavePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/members/${memberId}/change-password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.ok) {
        toaster.push(
          <Notification type="success" header="Success">
            Password changed successfully.
          </Notification>,
          { placement: "topEnd" }
        );
        navigate(`/profile/${memberId}`);
      } else {
        toaster.push(
          <Notification type="error" header="Error">
            Failed to change password
          </Notification>,
          { placement: "topEnd" }
        );
      }
    } catch (error) {
      toaster.push(
        <Notification type="error" header="Error">
          {error.message || "Failed to change password"}
        </Notification>,
        { placement: "topEnd" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-8 min-h-screen">
      <h1 className="text-center text-xl mb-4 font-bold">
        Change your password
      </h1>
      <Panel bordered>
        <Form.Group>
          <p className="text-base font-semibold mb-2">Current Password</p>
          <Input
            type="password"
            value={currentPassword}
            onChange={(value) => setCurrentPassword(value)}
          />
        </Form.Group>
        <Form.Group>
          <p className="text-base font-semibold mb-2">New password</p>
          <Input
            type="password"
            value={newPassword}
            onChange={(value) => setNewPassword(value)}
          />
        </Form.Group>
        <div className="flex justify-between mt-4">
          <Button
            appearance="primary"
            onClick={handleSavePassword}
            loading={loading}
          >
            Update password
          </Button>
          <Button color="orange" appearance="primary">
            <Link to={`/profile/${memberId}`}>Back</Link>
          </Button>
        </div>
      </Panel>
    </div>
  );
};

export default ChangePassword;
