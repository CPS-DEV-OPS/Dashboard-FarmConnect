

import React, { useState, useEffect } from "react";

function Crop() {
  const [showForm, setShowForm] = useState(false);
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({
    CropName: "",
    Quantity: "",
    ImageUrl: "",
    Description: "",
    Price: "",
    Category: "Crop",
  });
  //const [editCrop, setEditCrop] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editCropId, setEditCropId] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch("https://localhost:7079/api/Crop");
        if (response.ok) {
          const cropsFromAPI = await response.json();
          setCrops(cropsFromAPI);
        } else {
          console.error("Failed to fetch crops:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching crops:", error.message);
      }
    };

    fetchCrops();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrop({ ...newCrop, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewCrop({ ...newCrop, ImageUrl: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCrop = async () => {
    try {
      const response = await fetch("https://localhost:7079/api/Crop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCrop),
      });

      if (response.ok) {
        const newCropFromAPI = await response.json();
        const updatedCrops = [...crops, newCropFromAPI];
        setCrops(updatedCrops);
        setNewCrop({
          CropName: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "Crop",
        });
        setShowForm(false); // Hide the form after adding crop
      } else {
        console.error("Failed to add crop:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding crop:", error.message);
    }
  };

  
  const handleEditClick = (id) => {
    const cropToEdit = crops.find(
      (crop) => crop.id === id
    );
    if (cropToEdit) {
      setEditMode(true);
      setEditCropId(id);
      setNewCrop({
        CropName: cropToEdit.cropName,
        Quantity: cropToEdit.quantity,
        ImageUrl: cropToEdit.imageUrl,
        Description: cropToEdit.description,
        Price: cropToEdit.price,
        Category: "Crop",
      });
      setShowForm(true);
    }
  };
  const handleUpdateCrop = async () => {
    try {
      const response = await fetch(
        `https://localhost:7079/api/Crop/update?Id=${editCropId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCrop),
        }
      );

      if (response.ok) {
        const updatedCrop = await response.json();
        const updatedCrops = crops.map((crop) =>
          crop.id === editCropId ? updatedCrop : crop
        );
        setCrops(updatedCrops);
        setEditMode(false);
        setEditCropId(null);
        setNewCrop({
          CropName: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "Crop",
        });
        setShowForm(false);
      } else {
        console.error("Failed to update crop:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating crop:", error.message);
    }
  };

  

  

  const handleDeleteCrop = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7079/api/Crop/delete?Id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedCrops = crops.filter((crop) => crop.id !== crop.id);
        setCrops(updatedCrops);
        
        setNewCrop({
          CropName: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "Crop",
        });
      } else {
        console.error("Failed to delete crop:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewCrop({
      CropName: "",
      Quantity: "",
      ImageUrl: "",
      Description: "",
      Price: "",
      Category: "Crop",
    });
  };

  

  


  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

      <div className="mb-4">
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add Crop
        </button>
      </div>

      {showForm && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Add New Crop</h2>
          {/* Your form elements */}
          <div className="mb-4">
            <input
              type="text"
              name="CropName"
              placeholder="Crop Name"
              value={newCrop.CropName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="Quantity"
              placeholder="Quantity"
              value={newCrop.Quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="Price"
              placeholder="Price in ksh"
              value={newCrop.Price}
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
              placeholder="Crop Description"
              value={newCrop.Description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* ... */}
          <button
            onClick={handleAddCrop}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Crop
          </button>
          {editMode && (
            <button
              onClick={handleUpdateCrop}
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

      {/* Display Crops in a table */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Crops List</h2>
        <table className="border-collapse border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Image</th>
              <th className="border p-2">Crop Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop.id} className="border">
                <td className="border p-2">
                  {crop.imageUrl && (
                    <img
                      src={crop.imageUrl}
                      alt={crop.cropName}
                      className="max-w-full h-auto"
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  )}
                </td>
                <td className="border p-2">{crop.cropName}</td>
                <td className="border p-2">{crop.quantity}</td>
                <td className="border p-2">{crop.price}</td>
                <td className="border p-2">{crop.description}</td>
                <td className="border p-2">
                <button
                    onClick={() => handleEditClick(crop.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCrop(crop.id)}
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

export default Crop;
