import React, { useState, useEffect } from "react";

function Crop() {
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({
    CropName: "",
    Quantity: "",
    ImageUrl: "",
    Description: "",
    Price: "",
    Category: "Crop",
  });

    const [editCrop, setEditCrop] = useState(null);

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
      } else {
        console.error("Failed to add crop:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding crop:", error.message);
    }
  };


  const handleEditCrop = (crop) => {
    setEditCrop(crop);
    setNewCrop({crop }); // Copy the selected crop to edit
  };


  const handleSaveCrop = async () => {
    try {
      let response;

      if (editCrop) {
        // If editCrop is present, it means we are updating an existing crop
        response = await fetch(`https://localhost:7079/api/Crop/update?Id=${editCrop.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCrop),
        });
      } else {
        // If editCrop is not present, it means we are adding a new crop
        response = await fetch("https://localhost:7079/api/Crop", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCrop),
        });
      }

      if (response.ok) {
        const updatedCrops = editCrop
          ? crops.map((crop) => (crop.id === editCrop.id ? { ...crop, ...newCrop } : crop))
          : [...crops, await response.json()];

        setCrops(updatedCrops);
        setEditCrop(null);
        setNewCrop({
          CropName: "",
          Quantity: "",
          ImageUrl: "",
          Description: "",
          Price: "",
          Category: "Crop",
        });
      } else {
        console.error("Failed to save crop:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving crop:", error);
    }
  };

  const handleDeleteCrop = async (id) => {
    try {
      const response = await fetch(`https://localhost:7079/api/Crop/delete?Id=${id}`, {
        method: "DELETE", 
      });

      if (response.ok) {
        const updatedCrops = crops.filter((crop) => crop.id !== crop.id);
        setCrops(updatedCrops);
        setEditCrop(null);
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">Add New Crop</h2>
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
        <div className="mb-4">
          <button
            onClick={handleAddCrop}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Crop
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2">
        {crops.map((crop) => (
          <div key={crop.id} className="border p-4">
            {crop.imageUrl && (
              <div className="mt-2">
                <div style={{ maxWidth: '200px', maxHeight: '200px', overflow: 'hidden' }}>
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropName}
                    className="max-w-full h-auto"
                  />
                </div>
                <h2 className="text-lg font-semibold">{crop.cropName}</h2>
                <p>Crop Name: {crop.cropName}</p>
                <p>Quantity: {crop.quantity}</p>
                <p>Price: {crop.price}</p>
                <p>Description: {crop.description}</p>
                <div>
                  <button
                    // You can add an edit button here if needed
                    onClick={() => handleEditCrop(crop)}
                   
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    // You can add a delete button here if needed
                    onClick={() => handleDeleteCrop(crop.id)}
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

export default Crop;





