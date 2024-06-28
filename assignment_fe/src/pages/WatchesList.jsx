import { useEffect, useState } from "react";
import {
  Table,
  Button,
  IconButton,
  Modal,
  Form,
  SelectPicker,
  Checkbox,
  Notification,
  toaster,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import axios from "axios";

const { Column, HeaderCell, Cell } = Table;

const WatchesList = () => {
  // Giả sử danh sách các watches
  const [watches, setWatches] = useState([]);

  const [brands, setBrands] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentWatch, setCurrentWatch] = useState({
    id: "",
    watchName: "",
    brand: "",
    image: "",
    price: "",
    watchDescription: "",
    Automatic: false,
  });

  const [watchToDelete, setWatchToDelete] = useState(null);
  useEffect(() => {
    // Function to fetch watches from API
    const fetchWatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/watches");
        setWatches(response.data); // Assuming response.data is an array of watches
      } catch (error) {
        console.error("Error fetching watches:", error);
        // Handle error fetching data
      }
    };

    // Function to fetch brands from API
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:5000/brands");
        //setBrands(response.data);
        const formattedBrands = response.data.map((brand) => ({
          label: brand.brandName, // Adjust this based on your API response structure
          value: brand._id, // Assuming _id is the unique identifier for brands
        }));
        setBrands(formattedBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
        // Handle error fetching data
      }
    };

    // Call the fetch functions
    fetchWatches();
    fetchBrands();
  }, []);

  const handleAddWatch = () => {
    setCurrentWatch({
      id: "",
      watchName: "",
      brand: "",
      image: "",
      price: "",
      watchDescription: "",
      Automatic: false,
    });
    setShowAddModal(true);
  };

  const handleUpdateWatch = (watch) => {
    setCurrentWatch({
      id: watch._id,
      watchName: watch.watchName,
      brand: watch.brand._id,
      image: watch.image,
      price: watch.price,
      watchDescription: watch.watchDescription,
      Automatic: watch.Automatic,
    });
    setShowUpdateModal(true);
  };

  // const handleDeleteWatch = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/watches/${id}`);
  //     setWatches(watches.filter((watch) => watch._id !== id));
  //   } catch (error) {
  //     console.error("Error deleting watch:", error);
  //   }
  // };
  const handleDeleteWatch = (watch) => {
    setWatchToDelete(watch);
    setShowDeleteModal(true);
  };

  const confirmDeleteWatch = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/watches/${watchToDelete._id}`
      );
      setWatches(watches.filter((watch) => watch._id !== watchToDelete._id));
      setShowDeleteModal(false);
      toaster.push(
        <Notification type="success" header="Success">
          Watch deleted successfully
        </Notification>,
        { placement: "topEnd" }
      );
    } catch (error) {
      console.error("Error deleting watch:", error);
      toaster.push(
        <Notification type="error" header="Error">
          Failed to delete watch
        </Notification>,
        { placement: "topEnd" }
      );
    }
  };

  const createWatch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/watches",
        currentWatch
      );
      const newWatch = response.data.newWatch;
      const brand = brands.find((b) => b.value === newWatch.brand);
      newWatch.brand = { _id: brand.value, brandName: brand.label };
      setWatches([...watches, newWatch]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating watch:", error);
    }
  };

  const updateWatch = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/watches/${currentWatch.id}`,
        currentWatch
      );
      const updatedWatch = response.data.updatedWatch;
      // const brand = brands.find((b) => b.value === updatedWatch.brand);
      // updatedWatch.brand = { _id: brand.value, brandName: brand.label };
      const updatedWatches = watches.map((watch) =>
        watch._id === currentWatch.id ? updatedWatch : watch
      );
      setWatches(updatedWatches);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating watch:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Watch Management</h1>

      <div className="w-full max-w-4xl">
        <div className="flex justify-end mb-4">
          <Button color="green" appearance="primary" onClick={handleAddWatch}>
            <PlusIcon /> Add Watch
          </Button>
        </div>
        <Table autoHeight data={watches} className="w-full">
          <Column width={100} align="center" fixed>
            <HeaderCell>STT</HeaderCell>
            <Cell>{(rowData, rowIndex) => <span>{rowIndex + 1}</span>}</Cell>
          </Column>

          <Column flexGrow={4}>
            <HeaderCell>Watch Name</HeaderCell>
            <Cell dataKey="watchName" />
          </Column>

          <Column flexGrow={4}>
            <HeaderCell>Brand Name</HeaderCell>
            <Cell dataKey="brand.brandName" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Image</HeaderCell>
            <Cell dataKey="image" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Price</HeaderCell>
            <Cell dataKey="price" />
          </Column>

          <Column flexGrow={4}>
            <HeaderCell>Description</HeaderCell>
            <Cell dataKey="watchDescription" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Automatic</HeaderCell>
            <Cell>{(rowData) => (rowData.Automatic ? "Yes" : "No")}</Cell>
          </Column>

          <Column width={300} fixed="right">
            <HeaderCell>Actions</HeaderCell>
            <Cell>
              {(rowData) => (
                <div className="flex space-x-2">
                  <IconButton
                    icon={<EditIcon />}
                    appearance="primary"
                    onClick={() => handleUpdateWatch(rowData)}
                  >
                    Update
                  </IconButton>
                  <IconButton
                    icon={<TrashIcon />}
                    color="red"
                    appearance="primary"
                    onClick={() => handleDeleteWatch(rowData)}
                  >
                    Delete
                  </IconButton>
                </div>
              )}
            </Cell>
          </Column>
        </Table>
      </div>

      {/* Modal for Adding Watch */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
        <Modal.Header>
          <Modal.Title>Add New Watch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Watch Name</Form.ControlLabel>
              <Form.Control
                name="watchName"
                value={currentWatch.watchName}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, watchName: value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Brand Name</Form.ControlLabel>
              <SelectPicker
                data={brands}
                value={currentWatch.brand}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, brand: value })
                }
                block
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Image</Form.ControlLabel>
              <Form.Control
                name="image"
                value={currentWatch.image}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, image: value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Price</Form.ControlLabel>
              <Form.Control
                name="price"
                value={currentWatch.price}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, price: value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                name="watchDescription"
                value={currentWatch.watchDescription}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, watchDescription: value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Automatic</Form.ControlLabel>
              <Checkbox
                checked={currentWatch.Automatic}
                onChange={(value, checked) =>
                  setCurrentWatch({ ...currentWatch, Automatic: checked })
                }
              >
                Automatic
              </Checkbox>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createWatch} appearance="primary">
            Save
          </Button>
          <Button onClick={() => setShowAddModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Updating Watch */}
      <Modal open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <Modal.Header>
          <Modal.Title>Update Watch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Watch Name</Form.ControlLabel>
              <Form.Control
                name="watchName"
                value={currentWatch.watchName}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, watchName: value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Brand Name</Form.ControlLabel>
              <SelectPicker
                data={brands}
                value={currentWatch.brand}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, brand: value })
                }
                block
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Image</Form.ControlLabel>
              <Form.Control
                name="image"
                value={currentWatch.image}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, image: value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Price</Form.ControlLabel>
              <Form.Control
                name="price"
                value={currentWatch.price}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, price: value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                name="watchDescription"
                value={currentWatch.watchDescription}
                onChange={(value) =>
                  setCurrentWatch({ ...currentWatch, watchDescription: value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Automatic</Form.ControlLabel>
              <Checkbox
                checked={currentWatch.Automatic}
                onChange={(value, checked) =>
                  setCurrentWatch({ ...currentWatch, Automatic: checked })
                }
              >
                Automatic
              </Checkbox>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateWatch} appearance="primary">
            Update
          </Button>
          <Button onClick={() => setShowUpdateModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Confirming Delete Watch */}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the watch: {watchToDelete?.watchName}?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmDeleteWatch} appearance="primary" color="red">
            Yes
          </Button>
          <Button onClick={() => setShowDeleteModal(false)} appearance="subtle">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WatchesList;
