import React, { useState, useEffect } from "react";


function Product() {
  // Sample data for existing products
  const initialProducts = JSON.parse(localStorage.getItem("products")) || [];

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tomatoes",
      quantity: 20,
      imageUrl: "",
      description: "Fresh and juicy tomatoes",
      type: "Crop",
    },
    {
      id: 2,
      name: "Apples",
      quantity: 15,
      imageUrl: "",
      description: "Crispy apples",
      type: "Crop",
    },
    // Add more sample products here
  ]);

  // State for new product form

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    imageUrl: "",
    description: "",
    type: "Crop", // Default product type
  });

  // State for editing a product
  const [editProduct, setEditProduct] = useState(null);

  // New code:
  useEffect(() => {
    const productsFromStorage = JSON.parse(localStorage.getItem("products"));
    if (productsFromStorage) {
      setProducts(productsFromStorage);
    }
  }, []);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Function to handle image file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can use FileReader to read the selected file and set it in the state.
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProduct({ ...newProduct, imageUrl: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add a new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.quantity) {
      const newProductId = products.length + 1;
      const updatedProducts = [
        ...products,
        { id: newProductId, ...newProduct },
      ];
      setProducts(updatedProducts);
      setNewProduct({
        name: "",
        quantity: "",
        imageUrl: "",
        description: "",
        type: "Crop", // Reset to default product type
      });
    }
  };

  // Function to edit a product
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct(product);
  };

  // Function to save edited product
  const handleSaveProduct = () => {
    
    if (newProduct.name && newProduct.quantity) {
      const updatedProducts = products.map((product) =>
        product.id === newProduct.id ? newProduct : product
      );
      setProducts(updatedProducts);
      setEditProduct(null);
      setNewProduct({
        name: "",
        quantity: "",
        imageUrl: "",
        description: "",
        type: "Crop", // Reset to default product type
      });
      // New code:
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  // Function to delete a product
  const handleDeleteProduct = (product) => {
    const updatedProducts = products.filter((p) => p.id !== product.id);
    setProducts(updatedProducts);
    //new code
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

      {/* Add/Edit product form */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          {editProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-semibold">
            Product Type
          </label>
          <select
            name="type"
            id="type"
            value={newProduct.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="Crop">Crop</option>
            <option value="Animal">Animal</option>
            <option value="Animal Product">Animal Product</option>
          </select>
        </div>
        {editProduct ? (
          <button
            onClick={handleSaveProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Product
          </button>
        ) : (
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Product
          </button>
        )}
      </div>

      {/* Display existing products in a grid with constant image size */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Quantity: {product.quantity}</p>
            <p>Type: {product.type}</p>
            <p>Description: {product.description}</p>
            <div>
              <button
                onClick={() => handleEditProduct(product)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product)}
                className="ml-2 text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
            {product.imageUrl && (
              <div className="mt-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-w-full h-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
