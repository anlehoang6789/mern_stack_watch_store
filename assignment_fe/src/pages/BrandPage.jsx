import { useEffect, useState } from "react";
import {
  Table,
  Button,
  IconButton,
  Modal,
  Form,
  Notification,
  toaster,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import axios from "axios";

const { Column, HeaderCell, Cell } = Table;

const BrandPage = () => {
  const [brands, setBrands] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentBrand, setCurrentBrand] = useState({ id: "", brandName: "" });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5000/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      // Handle error fetching brands
    }
  };

  const createBrand = async () => {
    try {
      const response = await axios.post("http://localhost:5000/brands", {
        brandName: currentBrand.brandName,
      });
      const newBrand = response.data.brand;
      setBrands([...brands, newBrand]);
      setShowAddModal(false);
      setCurrentBrand({ id: "", brandName: "" });
      toaster.push(
        <Notification type="success" header="Success">
          Brand created successfully
        </Notification>,
        { placement: "topEnd" }
      );
    } catch (error) {
      console.error("Error creating brand:", error);
      // Handle error creating brand
      if (error.response && error.response.data) {
        toaster.push(
          <Notification type="error" header="Error">
            Failed to create brand: {error.response.data.message}
          </Notification>,
          { placement: "topEnd" }
        );
      }
    }
  };

  const updateBrand = async () => {
    try {
      await axios.put(`http://localhost:5000/brands/${currentBrand._id}`, {
        brandName: currentBrand.brandName,
      });
      setBrands(
        brands.map((brand) =>
          brand._id === currentBrand._id ? currentBrand : brand
        )
      );
      setShowUpdateModal(false);
      setCurrentBrand({ id: "", brandName: "" });
      toaster.push(
        <Notification type="success" header="Success">
          Brand update successfully
        </Notification>,
        { placement: "topEnd" }
      );
    } catch (error) {
      console.error("Error updating brand:", error);
      // Handle error updating brand
      if (error.response && error.response.data) {
        toaster.push(
          <Notification type="error" header="Error">
            Failed to update brand: {error.response.data.message}
          </Notification>,
          { placement: "topEnd" }
        );
      }
    }
  };

  const deleteBrand = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/brands/${id}`);
      setBrands(brands.filter((brand) => brand._id !== id));
      toaster.push(
        <Notification type="success" header="Success">
          Brand deleted successfully
        </Notification>,
        { placement: "topEnd" }
      );
    } catch (error) {
      console.error("Error deleting brand:", error);
      // Handle error deleting brand
      if (error.response && error.response.data) {
        toaster.push(
          <Notification type="error" header="Error">
            Failed to delete brand: {error.response.data.message}
          </Notification>,
          { placement: "topEnd" }
        );
      }
    }
  };

  const handleAddBrand = () => {
    setCurrentBrand({ id: "", brandName: "" });
    setShowAddModal(true);
  };

  const handleUpdateBrand = (brand) => {
    setCurrentBrand(brand);
    setShowUpdateModal(true);
  };

  const handleDeleteBrand = (id) => {
    deleteBrand(id);
  };

  const handleSaveNewBrand = () => {
    createBrand();
  };

  const handleSaveUpdatedBrand = () => {
    updateBrand();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Brand Management</h1>

      <div className="w-full max-w-4xl">
        <div className="flex justify-end mb-4">
          <Button color="green" appearance="primary" onClick={handleAddBrand}>
            <PlusIcon /> Add Brand
          </Button>
        </div>
        <Table autoHeight data={brands} className="w-full">
          <Column width={60} align="center" fixed>
            <HeaderCell>STT</HeaderCell>
            <Cell>{(rowData, rowIndex) => <span>{rowIndex + 1}</span>}</Cell>
          </Column>

          <Column flexGrow={3}>
            <HeaderCell>Brand Name</HeaderCell>
            <Cell dataKey="brandName" />
          </Column>

          <Column width={300} fixed="right">
            <HeaderCell>Actions</HeaderCell>
            <Cell>
              {(rowData) => (
                <div className="flex space-x-2">
                  <IconButton
                    icon={<EditIcon />}
                    appearance="primary"
                    onClick={() => handleUpdateBrand(rowData)}
                  >
                    Update
                  </IconButton>
                  <IconButton
                    icon={<TrashIcon />}
                    color="red"
                    appearance="primary"
                    onClick={() => handleDeleteBrand(rowData._id)}
                  >
                    Delete
                  </IconButton>
                </div>
              )}
            </Cell>
          </Column>
        </Table>
      </div>

      {/* Modal for Adding Brand */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
        <Modal.Header>
          <Modal.Title>Add New Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Brand Name</Form.ControlLabel>
              <Form.Control
                name="brandName"
                value={currentBrand.brandName}
                onChange={(value) =>
                  setCurrentBrand({ ...currentBrand, brandName: value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveNewBrand} appearance="primary">
            Save
          </Button>
          <Button onClick={() => setShowAddModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Updating Brand */}
      <Modal open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <Modal.Header>
          <Modal.Title>Update Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Brand Name</Form.ControlLabel>
              <Form.Control
                name="brandName"
                value={currentBrand.brandName}
                onChange={(value) =>
                  setCurrentBrand({ ...currentBrand, brandName: value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveUpdatedBrand} appearance="primary">
            Update
          </Button>
          <Button onClick={() => setShowUpdateModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BrandPage;
