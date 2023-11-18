import React, { useState, useEffect } from "react";

function AnimalProduct() {
  const [showForm, setShowForm] = useState(false);
  const [animalProducts, setAnimalProducts] = useState([]);
  const [newAnimalProduct, setNewAnimalProduct] = useState({
    Name: "",
    Quantity: "",
    ImageUrl: "",
    Description: "",
    Price: "",
    Category: "AnimalProduct",
  });

  useEffect(() => {
    const fetchAnimalProducts = async () => {
      try {
        const response = await fetch(
          "https://localhost:7079/api/AnimalProduct"
        );
        if (response.ok) {
          const animalProductsFromAPI = await response.json();
          setAnimalProducts(animalProductsFromAPI);
        } else {
          console.error("Failed to fetch animalProducts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching animalProducts:", error.message);
      }
    };

    fetchAnimalProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimalProduct({ ...newAnimalProduct, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewAnimalProduct({
          ...newAnimalProduct,
          ImageUrl: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAnimalProduct = async () => {
    try {
      const response = await fetch("https://localhost:7079/api/AnimalProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnimalProduct),
      });

      if (response.ok) {
        const newAnimalProductFromAPI = await response.json();
        const updatedAnimalProducts = [
          ...animalProducts,
          newAnimalProductFromAPI,
        ];
        setAnimalProducts(updatedAnimalProducts);
        setNewAnimalProduct({
          Name: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "AnimalProduct",
        });
        setShowForm(false); // Hide the form after adding animal product
      } else {
        console.error("Failed to add Animal Product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding Animal Product:", error.message);
    }
  };

  const handleDeleteAnimalProduct = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7079/api/AnimalProduct/delete?Id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedAnimalProducts = animalProducts.filter(
          (animalProduct) => animalProduct.id !== id
        );
        setAnimalProducts(updatedAnimalProducts);

        setNewAnimalProduct({
          Name: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "AnimalProduct",
        });
      } else {
        console.error("Failed to delete Animal Product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Animal Product:", error);
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewAnimalProduct({
      Name: "",
      Quantity: "",
      ImageUrl: "",
      Description: "",
      Price: "",
      Category: "AnimalProduct",
    });
  };

  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const handleEditClick = (id) => {
    const productToEdit = animalProducts.find(
      (animalProduct) => animalProduct.id === id
    );
    if (productToEdit) {
      setEditMode(true);
      setEditProductId(id);
      setNewAnimalProduct({
        Name: productToEdit.name,
        Quantity: productToEdit.quantity,
        ImageUrl: productToEdit.imageUrl,
        Description: productToEdit.description,
        Price: productToEdit.price,
        Category: "AnimalProduct",
      });
      setShowForm(true);
    }
  };

  const handleUpdateAnimalProduct = async () => {
    try {
      const response = await fetch(
        `https://localhost:7079/api/AnimalProduct/update?Id=${editProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAnimalProduct),
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        const updatedProducts = animalProducts.map((product) =>
          product.id === editProductId ? updatedProduct : product
        );
        setAnimalProducts(updatedProducts);
        setEditMode(false);
        setEditProductId(null);
        setNewAnimalProduct({
          Name: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "AnimalProduct",
        });
        setShowForm(false);
      } else {
        console.error("Failed to update Animal Product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Animal Product:", error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

      <div className="mb-4">
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add Animal Product
        </button>
      </div>

      {showForm && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Add New Animal Product</h2>
          {/* Your form elements */}
          <div className="mb-4">
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={newAnimalProduct.Name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="Quantity"
              placeholder="Quantity"
              value={newAnimalProduct.Quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="Price"
              placeholder="Price in ksh"
              value={newAnimalProduct.Price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="Image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="mb-4">
            <textarea
              name="Description"
              placeholder="Product Description"
              value={newAnimalProduct.Description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={handleAddAnimalProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
          {editMode && (
            <button
              onClick={handleUpdateAnimalProduct}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Update
            </button>
          )}

          <button
            onClick={handleCloseForm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Display Animal Products in a table */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Animal Products List</h2>
        <table className="border-collapse border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Image</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {animalProducts.map((animalProduct) => (
              <tr key={animalProduct.id} className="border">
                <td className="border p-2">
                  {animalProduct.imageUrl && (
                    <img
                      src={animalProduct.imageUrl}
                      alt={animalProduct.name}
                      className="max-w-full h-auto"
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  )}
                </td>
                <td className="border p-2">{animalProduct.name}</td>
                <td className="border p-2">{animalProduct.quantity}</td>
                <td className="border p-2">{animalProduct.price}</td>
                <td className="border p-2">{animalProduct.description}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditClick(animalProduct.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAnimalProduct(animalProduct.id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnimalProduct;
