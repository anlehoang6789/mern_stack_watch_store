import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "rsuite";
import axios from "axios";

// src/components/Products.jsx
// const products = [
//   // Add your product data here
//   { id: 1, name: "Rolex Sea-Dweller", brand: "Rolex", image: "url-to-image" },
//   { id: 3, name: "Rolex Sea-Dweller", brand: "Rolex", image: "url-to-image" },
//   { id: 2, name: "Rolex Sea-Dweller", brand: "Rolex", image: "url-to-image" },
//   { id: 4, name: "Rolex Sea-Dweller", brand: "Rolex", image: "url-to-image" },
//   { id: 5, name: "Rolex Sea-Dweller", brand: "Rolex", image: "url-to-image" },
//   { id: 6, name: "Rolex Sea-Dweller", brand: "Rolex", image: "url-to-image" },
//   // More products
// ];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/watches");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch watches:", error);
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">All Product</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.watchName}
              className="w-full h-40 object-cover mb-2"
            />
            <h4 className="font-bold">{product.watchName}</h4>
            <p className="text-gray-600">{product.brand.brandName}</p>
            <Button appearance="primary" className="mt-2">
              <Link to={`/details/${product._id}`}>View Details</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
