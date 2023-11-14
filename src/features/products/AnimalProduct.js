import React, { useState, useEffect } from "react";

function AnimalProduct() {
  const [animalProducts, SetAnimalProducts] = useState([]);
  const [newAnimalProduct, setNewAnimalProduct] = useState({
    Name: "",
    Quantity: "",
    ImageUrl: "",
    Description: "",
    Price: "",
    Category: "AnimalProduct",
  });

    const [editAnimalProduct, setEditAnimalProduct] = useState(null);

  useEffect(() => {
    const fetchAnimalProducts = async () => {
      try {
        const response = await fetch("https://localhost:7079/api/AnimalProduct");
        if (response.ok) {
          const animalProductsFromAPI = await response.json();
          SetAnimalProducts(animalProductsFromAPI);
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
        setNewAnimalProduct({ ...newAnimalProduct, ImageUrl: event.target.result });
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
        const updatedAnimalProducts = [...animalProducts, newAnimalProductFromAPI];
        SetAnimalProducts(updatedAnimalProducts);
        setNewAnimalProduct({
          Name: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "AnimalProduct",
        });
      } else {
        console.error("Failed to Animal Product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding Animal Product:", error.message);
    }
  };


  const handleEditAnimalProduct = (animalProduct) => {
    setEditAnimalProduct(animalProduct);
    setNewAnimalProduct({animalProduct }); // Copy the selected animalProduct to edit
  };


  const handleSaveAnimalProduct = async () => {
    try {
      let response;

      if (editAnimalProduct) {
        // If editAnimalProduct is present, it means we are updating an existing animalProduct
        response = await fetch(`https://localhost:7079/api/AnimalProduct/update?Id=${editAnimalProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAnimalProduct),
        });
      } else {
        // If editAnimalProduct is not present, it means we are adding a new animalProduct
        response = await fetch("https://localhost:7079/api/AnimalProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAnimalProduct),
        });
      }

      if (response.ok) {
        const updatedAnimalProducts = editAnimalProduct
          ? animalProducts.map((animalProduct) => (animalProduct.id === editAnimalProduct.id ? { ...animalProduct, ...newAnimalProduct } : animalProduct))
          : [...animalProducts, await response.json()];

        SetAnimalProducts(updatedAnimalProducts);
        setEditAnimalProduct(null);
        setNewAnimalProduct({
          Name: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "Crop",
        });
      } else {
        console.error("Failed to save animalProduct:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving animalProduct:", error);
    }
  };

  const handleDeleteAnimalProduct = async (id) => {
    try {
      const response = await fetch(`https://localhost:7079/api/AnimalProduct/delete?Id=${id}`, {
        method: "DELETE", 
      });

      if (response.ok) {
        const updatedAnimalProducts = animalProducts.filter((animalProduct) => animalProduct.id !== animalProduct.id);
        SetAnimalProducts(updatedAnimalProducts);
        setEditAnimalProduct(null);
        setNewAnimalProduct({
          Name: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "Crop",
        });
      } else {
        console.error("Failed to delete animal Product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting animal Product:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">Add Animal Product</h2>
        <div className="mb-4">
          <input
            type="text"
            name="Name"
            placeholder="Product Name"
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
        <div className="mb-4">
          <button
            onClick={handleAddAnimalProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Animal Productp
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2">
        {animalProducts.map((animalProduct) => (
          <div key={animalProduct.id} className="border p-4">
            {animalProduct.imageUrl && (
              <div className="mt-2">
                <div style={{ maxWidth: '200px', maxHeight: '200px', overflow: 'hidden' }}>
                  <img
                    src={animalProduct.imageUrl}
                    alt={animalProduct.animalProductName}
                    className="max-w-full h-auto"
                  />
                </div>
                <h2 className="text-lg font-semibold">{animalProduct.animalProductName}</h2>
                <p>Animal-Product Name: {animalProduct.animalProductName}</p>
                <p>Quantity: {animalProduct.quantity}</p>
                <p>Price: {animalProduct.price}</p>
                <p>Description: {animalProduct.description}</p>
                <div>
                  <button
                    // You can add an edit button here if needed
                    onClick={() => handleEditAnimalProduct(animalProduct)}
                   
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    // You can add a delete button here if needed
                    onClick={() => handleDeleteAnimalProduct(animalProduct.id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimalProduct;





