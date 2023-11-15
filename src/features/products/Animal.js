import React, { useState, useEffect } from "react";

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    AnimalName: "",
    Age:"",
    Vaccination: "",
    ImageUrl: "",
    Weight: "",
    Offspring:"",
    Breed:"",
    Price: "",
    Category: "animal",
  });

    const [editAnimal, setEditAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch("https://localhost:7079/api/Animal");
        if (response.ok) {
          const animalsFromAPI = await response.json();
          setAnimals(animalsFromAPI);
        } else {
          console.error("Failed to fetch animals:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching animals:", error.message);
      }
    };

    fetchAnimals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal({ ...newAnimal, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewAnimal({ ...newAnimal, ImageUrl: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAnimal = async () => {
    try {
      const response = await fetch("https://localhost:7079/api/Animal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnimal),
      });

      if (response.ok) {
        const newAnimalFromAPI = await response.json();
        const updatedAnimals = [...animals, newAnimalFromAPI];
        setAnimals(updatedAnimals);
        setNewAnimal({
          AnimalName: "",
          Age: "",
          ImageUrl: "",
          Vaccination: "",
          Weight:"",
          Offspring:"",
          Breed:"",
          Price: "",
          Category: "Animal",
        });
      } else {
        console.error("Failed to add animal:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding animal:", error.message);
    }
  };


  const handleEditAnimal = (animal) => {
    setEditAnimal(animal);
    setNewAnimal({animal }); // Copy the selected animal to edit
  };


  const handleSaveAnimal = async () => {
    try {
      let response;

      if (editAnimal) {
        // If editAnimal is present, it means we are updating an existing animal
        response = await fetch(`https://localhost:7079/api/Animal/update?Id=${editAnimal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAnimal),
        });
      } else {
        // If editanimal is not present, it means we are adding a new animal
        response = await fetch("https://localhost:7079/api/Animal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAnimal),
        });
      }

      if (response.ok) {
        const updatedAnimals = editAnimal
          ? animals.map((animal) => (animal.id === editAnimal.id ? { ...animal, ...newAnimal } : animal))
          : [...animals, await response.json()];

        setAnimals(updatedAnimals);
        setEditAnimal(null);
        setNewAnimal({
          AnimalName: "",
          Age:"",
          Weight: "",
          ImageUrl: "",
          Vaccination: "",
          Breed:"",
          Offspring:"",
          Price: "",
          Category: "Animal",
        });
      } else {
        console.error("Failed to save animal:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving animal:", error);
    }
  };

  const handleDeleteAnimal = async (id) => {
    try {
      const response = await fetch(`https://localhost:7079/api/animal/delete?Id=${id}`, {
        method: "DELETE", 
      });

      if (response.ok) {
        const updatedAnimals = animals.filter((animal) => animal.id !== animal.id);
        setAnimals(updatedAnimals);
        setEditAnimal(null);
        setNewAnimal({
          AnimalName: "",
          Age: "",
          ImageUrl: "",
          Vaccination: "",
          Offspring:"",
          Breed:"",
          Weight:"",
          Price: "",
          Category: "Animal",
        });
      } else {
        console.error("Failed to delete animal:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>
  
      {/* Add New Animal form */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Add New Animal</h2>
        <div className="mb-4">
          <input
            type="text"
            name="AnimalName"
            placeholder="Animal Name"
            value={newAnimal.AnimalName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="Age"
            placeholder="Age"
            value={newAnimal.Age}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="Vaccination"
            placeholder="Vaccination"
            value={newAnimal.Vaccination}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="Weight"
            placeholder="Weight"
            value={newAnimal.Weight}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="Offspring"
            placeholder="Offspring"
            value={newAnimal.Offspring}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="Price"
            placeholder="Price in ksh"
            value={newAnimal.Price}
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
            name="Breed"
            placeholder="Breed"
            value={newAnimal.Breed}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handleAddAnimal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Animal
          </button>
        </div>
      </div>
  
      {/* Display Animals in a table */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Animals List</h2>
        <table className="border-collapse border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Image</th>
              <th className="border p-2">Animal Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Vaccination</th>
              <th className="border p-2">Offspring</th>
              <th className="border p-2">Breed</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Weight</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id} className="border">
                <td className="border p-2">
                  {animal.imageUrl && (
                    <img
                      src={animal.imageUrl}
                      alt={animal.AnimalName}
                      className="max-w-full h-auto"
                      style={{ maxWidth: '50px', maxHeight: '50px' }}
                    />
                  )}
                </td>
                <td className="border p-2">{animal.animalName}</td>
                <td className="border p-2">{animal.age}</td>
                <td className="border p-2">{animal.vaccination}</td>
                <td className="border p-2">{animal.offspring}</td>
                <td className="border p-2">{animal.breed}</td>
                <td className="border p-2">{animal.price}</td>
                <td className="border p-2">{animal.weight}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditAnimal(animal)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAnimal(animal.id)}
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

export default Animal;





