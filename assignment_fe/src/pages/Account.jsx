import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Notification, toaster, Modal } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const Account = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/members/accounts"
      );
      setUsers(response.data.members);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Xử lý lỗi khi không thể lấy danh sách người dùng
    }
  };

  const handleDeleteUser = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!deleteUserId) return;
    try {
      await axios.delete(`http://localhost:5000/members/${deleteUserId}`);
      setUsers(users.filter((user) => user._id !== deleteUserId));
      toaster.push(
        <Notification type="success" header="Success">
          User deleted successfully
        </Notification>,
        { placement: "topEnd" }
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      // Xử lý lỗi khi không thể xóa người dùng
      if (error.response && error.response.data) {
        toaster.push(
          <Notification type="error" header="Error">
            Failed to delete user: {error.response.data.message}
          </Notification>,
          { placement: "topEnd" }
        );
      }
    } finally {
      setShowDeleteModal(false);
      setDeleteUserId(null);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setDeleteUserId(null);
  };
  return (
    <div className="flex flex-col items-center justify-center h-[500px]">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="w-full max-w-4xl mt-4 text-center ml-72">
        <Modal open={showDeleteModal} onHide={closeModal} size="xs">
          <Modal.Header>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              After deleting this user, they will not be able to log in next
              time. Are you sure you want to delete?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={confirmDeleteUser} appearance="primary">
              Confirm
            </Button>
            <Button onClick={closeModal} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Table
          autoHeight
          data={users}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
        >
          <Column width={60} align="center" fixed>
            <HeaderCell>STT</HeaderCell>
            <Cell>{(rowData, rowIndex) => <span>{rowIndex + 1}</span>}</Cell>
          </Column>

          <Column width={150}>
            <HeaderCell>UserName</HeaderCell>
            <Cell dataKey="memberName" />
          </Column>

          <Column width={150}>
            <HeaderCell>FullName</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={100}>
            <HeaderCell>Role</HeaderCell>
            <Cell>
              {(rowData) => (
                <span>{rowData.isAdmin ? "Admin" : "Customer"}</span>
              )}
            </Cell>
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) =>
                !rowData.isAdmin && (
                  <Button
                    appearance="primary"
                    color="red"
                    onClick={() => handleDeleteUser(rowData._id)}
                  >
                    Delete
                  </Button>
                )
              }
            </Cell>
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default Account;
