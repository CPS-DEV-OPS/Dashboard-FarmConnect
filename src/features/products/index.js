// // import React, { useState, useEffect } from "react";
// // //import CurrencyFormat from "react-currency-format";



// // function Product() {
// //   // Sample data for existing products
// //   const initialProducts = JSON.parse(localStorage.getItem("products")) || [];

// //   const [products, setProducts] = useState([]);

// // useEffect(() => {
// //   const productsFromStorage = JSON.parse(localStorage.getItem("products"));
// //   if (productsFromStorage) {
// //     setProducts(productsFromStorage);
// //   } else {
// //     // If there's no data in localStorage, set the initial sample data
// //     setProducts([
// //       {
// //         id: 1,
// //         name: "Tomatoes",
// //         quantity: 20,
// //         imageUrl: "",
// //         description: "Fresh and juicy tomatoes",
// //         type: "Crop",
// //         quantityType: "Kgs",
// //       },
// //       {
// //         id: 2,
// //         name: "Apples",
// //         quantity: 15,
// //         imageUrl: "",
// //         description: "Crispy apples",
// //         type: "Crop",
// //         quantityType: "Kgs",
// //       },
// //       // Add more sample products here
// //     ]);
// //   }
// // }, []);

// //   // State for new product form

// //   const [newProduct, setNewProduct] = useState({
// //     name: "",
// //     quantity: "",
// //     imageUrl: "",
// //     description: "",
// //     price: "",
// //     type: "Crop", // Default product type
// //     quantityType:"Kgs",
// //   });

// //   // State for editing a product
// //   const [editProduct, setEditProduct] = useState(null);

// //   // New code:
// //   useEffect(() => {
// //     const productsFromStorage = JSON.parse(localStorage.getItem("products"));
// //     if (productsFromStorage) {
// //       setProducts(productsFromStorage);
// //     }
// //   }, []);

// //   // Function to handle form input changes
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewProduct({ ...newProduct, [name]: value });
// //   };

// //   // Function to handle image file input
// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // You can use FileReader to read the selected file and set it in the state.
// //       const reader = new FileReader();
// //       reader.onload = (event) => {
// //         setNewProduct({ ...newProduct, imageUrl: event.target.result });
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   // Function to add a new product
// //   const handleAddProduct = () => {
// //     if (newProduct.name && newProduct.quantity) {
// //       const newProductId = products.length + 1;
// //       const updatedProducts = [
// //         ...products,
// //         { id: newProductId, ...newProduct },
// //       ];
// //       setProducts(updatedProducts);
// //       setNewProduct({
// //         name: "",
// //         quantity: "",
// //         imageUrl: "",
// //         description: "",
// //         price: "",
// //         type: "Crop", // Reset to default product type
// //         quantityType: "Kgs",
// //       });
// //     }
// //   };

// //   // Function to edit a product
// //   const handleEditProduct = (product) => {
// //     setEditProduct(product);
// //     setNewProduct(product);
// //   };

// //   // Function to save edited product
// //   const handleSaveProduct = () => {
    
// //     if (newProduct.name &&   newProduct.quantity) {
// //       const updatedProducts = products.map((product) =>
// //         product.id === newProduct.id ? newProduct : product
// //       );
// //       setProducts(updatedProducts);
// //       setEditProduct(null);
// //       setNewProduct({
// //         name: "",
// //         quantity: "",
// //         imageUrl: "",
// //         description: "",
// //         price: "",
// //         type: "Crop", // Reset to default product type
// //         quantityType: "Kgs",
// //       });
// //       // New code:
// //       localStorage.setItem("products", JSON.stringify(updatedProducts));
// //     }
// //   };

// //   // Function to delete a product
// //   const handleDeleteProduct = (product) => {
// //     const updatedProducts = products.filter((p) => p.id !== product.id);
// //     setProducts(updatedProducts);
// //     //new code
// //     localStorage.setItem('products', JSON.stringify(updatedProducts));
// //   };
// //   //new
// //   const columnsPerRow = 3;

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

// //       {/* Add/Edit product form */}
// //       <div>
// //         <h2 className="text-xl font-semibold mb-2">
// //           {editProduct ? "Edit Product" : "Add New Product"}
// //         </h2>
// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Product Name"
// //             value={newProduct.name}
// //             onChange={handleInputChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <input

// //             type="number"
// //             name="quantity"
// //             placeholder="Quantity"
// //             value={newProduct.quantity}
// //             onChange={handleInputChange}
// //             cl
// //             assName="w-full px-3 py-2 border rounded-lg"
// //           />
// //           </div>
// //         {/* new */}
// //         <div className="mb-4">
// //           <label htmlFor="type" className="block text-gray-700 font-semibold">
// //             Quantity Type
// //           </label>
// //           <select
// //             name="quantityType"
// //             id="quantityType"
// //             value={newProduct.quantityType}
// //             onChange={handleInputChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //           >
// //             <option value="Bags">Bags</option>
// //             <option value="Kgs">Kgs</option>
// //             <option value="litres">litres</option>
// //           </select>

// //         </div>

// //           </div>
// //           <div className="mb-4">
// //           <input
// //             type="number"
// //             name="price"
// //             placeholder="Price in ksh"    
// //             value={newProduct.price}
// //             onChange={handleInputChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <input
// //             type="file"
// //             name="image"
// //             accept="image/*"
// //             onChange={handleImageUpload}
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             name="description"
// //             placeholder="Product Description"
// //             value={newProduct.description}
// //             onChange={handleInputChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label htmlFor="type" className="block text-gray-700 font-semibold">
// //             Product Type
// //           </label>
// //           <select
// //             name="type"
// //             id="type"
// //             value={newProduct.type}
// //             onChange={handleInputChange}
// //             className="w-full px-3 py-2 border rounded-lg"
// //           >
// //             <option value="Crop">Crop</option>
// //             <option value="Animal">Animal</option>
// //             <option value="Animal Product">Animal Product</option>
// //           </select>

        
// //         {editProduct ? (
// //           <button
// //             onClick={handleSaveProduct}
// //             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
// //           >
// //             Save Product
// //           </button>
// //         ) : (
// //           <button
// //             onClick={handleAddProduct}
// //             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
// //           >
// //             Add Product
// //           </button>
// //         )}
// //       </div>

// //       {/* Display existing products in a grid with constant image size */}
// //       <div className="mb-6 grid grid-cols-3 gap-2">
// //         {products.map((product) => (
// //           <div key={product.id} className="border p-4">
// //             {product.imageUrl && (
// //               <div className="mt-2">
// //                 <div style={{ maxWidth: '200px', maxHeight: '200px', overflow: 'hidden' }}>
// //                 <img
// //                   src={product.imageUrl}
// //                   alt={product.name}
// //                   className="max-w-full h-auto"
                  
// //                 />
// //                 </div>
// //             <h2 className="text-lg font-semibold">{product.name}</h2>
            
// //             <p>Quantity: {product.quantity}</p>
// //             <p>Type: {product.type}</p>
// //             <p>Description: {product.description}</p>
// //             <p>QuantityType: {product.quantityType}</p>
// //             {/* <div>
// //                   <CurrencyFormat
// //                     value={product.price}
// //                     displayType={"text"}
// //                     thousandSeparator={true}
// //                     suffix={" KES"}
// //                     renderText={(formattedValue) => (
// //                       <p>Price: {formattedValue}</p>
// //                     )}
// //                   />
// //                   </div> */}
// //             {/* <p>Price: {product.price}</p> */}
// //             <div>
// //               <button
// //                 onClick={() => handleEditProduct(product)}
// //                 className="text-blue-500 hover:underline"
// //               >
// //                 Edit
// //               </button>
// //               <button
// //                 onClick={() => handleDeleteProduct(product)}
// //                 className="ml-2 text-red-500 hover:underline"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Product;




// import React, { useState, useEffect } from "react";

// function Product() {
//   const [crops, setCrops] = useState([]);
//   const [newCrop, setNewCrop] = useState({
//     CropName: "",
//     Quantity: "",
//     ImageUrl: "",
//     Description: "",
//     Price: "",
//     Category: "Crop",
//   });

//   const [editCrop, setEditCrop] = useState(null);

//   useEffect(() => {
//     const fetchCrops = async () => {
//       try {
//         const response = await fetch("https://localhost:7079/api/Crop");
//         if (response.ok) {
//           const cropsFromAPI = await response.json();
//           setCrops(cropsFromAPI);
//         } else {
//           console.error("Failed to fetch crops:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching crops:", error.message);
//       }
//     };

//     fetchCrops();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCrop({ ...newCrop, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setNewCrop({ ...newCrop, ImageUrl: event.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddCrop = async () => {
//     try {
//       const response = await fetch("https://localhost:7079/api/Crop", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCrop),
//       });

//       if (response.ok) {
//         const newCropFromAPI = await response.json();
//         const updatedCrops = [...crops, newCropFromAPI];
//         setCrops(updatedCrops);
//         setNewCrop({
//           CropName: "",
//           Quantity: "",
//           ImageUrl: "",
//           Description: "",
//           Price: "",
//           Category: "Crop",
//         });
//       } else {
//         console.error("Failed to add crop:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error adding crop:", error);
//     }
//   };

//   const handleEditCrop = (crop) => {
//     setEditCrop(crop);
//     setNewCrop({
//       CropName: crop.CropName,
//       Quantity: crop.Quantity,
//       ImageUrl: crop.ImageUrl,
//       Description: crop.Description,
//       Price: crop.Price,
//       Category: crop.Category,
//     });
//   };

//   const handleSaveCrop = async () => {
//     try {
//       const response = await fetch(`https://localhost:7079/api/Crop/${editCrop.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCrop),
//       });

//       if (response.ok) {
//         const updatedCrops = crops.map((crop) =>
//           crop.id === editCrop.id ? { ...crop, ...newCrop } : crop
//         );
//         setCrops(updatedCrops);
//         setEditCrop(null);
//         setNewCrop({
//           CropName: "",
//           Quantity: "",
//           ImageUrl: "",
//           Description: "",
//           Price: "",
//           Category: "Crop",
//         });
//       } else {
//         console.error("Failed to save crop:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error saving crop:", error);
//     }
//   };

//   const handleDeleteCrop = async (crop) => {
//     try {
//       const response = await fetch(`https://localhost:7079/api/Crop/${crop.id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         const updatedCrops = crops.filter((c) => c.id !== crop.id);
//         setCrops(updatedCrops);
//         setEditCrop(null);
//         setNewCrop({
//           CropName: "",
//           Quantity: "",
//           ImageUrl: "",
//           Description: "",
//           Price: "",
//           Category: "Crop",
//         });
//       } else {
//         console.error("Failed to delete crop:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error deleting crop:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">{editCrop ? "Edit Crop" : "Add New Crop"}</h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             name="CropName"
//             placeholder="Crop Name"
//             value={newCrop.CropName}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="number"
//             name="Quantity"
//             placeholder="Quantity"
//             value={newCrop.Quantity}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="number"
//             name="Price"
//             placeholder="Price in ksh"
//             value={newCrop.Price}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//         </div>
//         <div className="mb-4">
//           <textarea
//             name="Description"
//             placeholder="Crop Description"
//             value={newCrop.Description}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <button
//             onClick={editCrop ? handleSaveCrop : handleAddCrop}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             {editCrop ? "Save Crop" : "Add Crop"}
//           </button>
//         </div>
//       </div>

//       <div className="mb-6 grid grid-cols-3 gap-2">
//         {crops.map((crop) => (
//           <div key={crop.id} className="border p-4">
//             {crop.ImageUrl && (
//               <div className="mt-2">
//                 <div style={{ maxWidth: '200px', maxHeight: '200px', overflow: 'hidden' }}>
//                   <img
//                     src={crop.ImageUrl}
//                     alt={crop.CropName}
//                     className="max-w-full h-auto"
//                   />
//                 </div>
//                 <h2 className="text-lg font-semibold">{crop.CropName}</h2>
//                 <p>Quantity: {crop.Quantity}</p>
//                 <p>Price: {crop.Price}</p>
//                 <p>Description: {crop.Description}</p>
//                 <div>
//                   <button
//                     onClick={() => handleEditCrop(crop)}
//                     className="text-blue-500 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteCrop(crop)}
//                     className="ml-2 text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Product;



// import React, { useState, useEffect } from "react";

// function Product() {
//   const [crops, setCrops] = useState([]);
//   const [newCrop, setNewCrop] = useState({
//     CropName: "",
//     Quantity: "",
//     ImageUrl: "",
//     Description: "",
//     Price: "",
//     Category: "Crop",
//   });

//     const [editCrop, setEditCrop] = useState(null);

//   useEffect(() => {
//     const fetchCrops = async () => {
//       try {
//         const response = await fetch("https://localhost:7079/api/Crop");
//         if (response.ok) {
//           const cropsFromAPI = await response.json();
//           setCrops(cropsFromAPI);
//         } else {
//           console.error("Failed to fetch crops:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching crops:", error.message);
//       }
//     };

//     fetchCrops();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCrop({ ...newCrop, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setNewCrop({ ...newCrop, ImageUrl: event.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddCrop = async () => {
//     try {
//       const response = await fetch("https://localhost:7079/api/Crop", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCrop),
//       });

//       if (response.ok) {
//         const newCropFromAPI = await response.json();
//         const updatedCrops = [...crops, newCropFromAPI];
//         setCrops(updatedCrops);
//         setNewCrop({
//           CropName: "",
//           Quantity: "",
//           ImageUrl: "",
//           Description: "",
//           Price: "",
//           Category: "Crop",
//         });
//       } else {
//         console.error("Failed to add crop:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error adding crop:", error.message);
//     }
//   };


//   const handleEditCrop = (crop) => {
//     setEditCrop(crop);
//     setNewCrop({crop }); // Copy the selected crop to edit
//   };


//   const handleSaveCrop = async () => {
//     try {
//       let response;

//       if (editCrop) {
//         // If editCrop is present, it means we are updating an existing crop
//         response = await fetch(`https://localhost:7079/api/Crop/update?Id=${editCrop.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newCrop),
//         });
//       } else {
//         // If editCrop is not present, it means we are adding a new crop
//         response = await fetch("https://localhost:7079/api/Crop", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newCrop),
//         });
//       }

//       if (response.ok) {
//         const updatedCrops = editCrop
//           ? crops.map((crop) => (crop.id === editCrop.id ? { ...crop, ...newCrop } : crop))
//           : [...crops, await response.json()];

//         setCrops(updatedCrops);
//         setEditCrop(null);
//         setNewCrop({
//           CropName: "",
//           Quantity: "",
//           ImageUrl: "",
//           Description: "",
//           Price: "",
//           Category: "Crop",
//         });
//       } else {
//         console.error("Failed to save crop:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error saving crop:", error);
//     }
//   };

//   const handleDeleteCrop = async (id) => {
//     try {
//       const response = await fetch(`https://localhost:7079/api/Crop/delete?Id=${id}`, {
//         method: "DELETE", 
//       });

//       if (response.ok) {
//         const updatedCrops = crops.filter((crop) => crop.id !== crop.id);
//         setCrops(updatedCrops);
//         setEditCrop(null);
//         setNewCrop({
//           CropName: "",
//           Quantity: "",
//           ImageUrl: "",
//           Description: "",
//           Price: "",
//           Category: "Crop",
//         });
//       } else {
//         console.error("Failed to delete crop:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error deleting crop:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Add New Crop</h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             name="CropName"
//             placeholder="Crop Name"
//             value={newCrop.CropName}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="number"
//             name="Quantity"
//             placeholder="Quantity"
//             value={newCrop.Quantity}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="number"
//             name="Price"
//             placeholder="Price in ksh"
//             value={newCrop.Price}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="file"
//             name="Image"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//         </div>
//         <div className="mb-4">
//           <textarea
//             name="Description"
//             placeholder="Crop Description"
//             value={newCrop.Description}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <button
//             onClick={handleAddCrop}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Add Crop
//           </button>
//         </div>
//       </div>

//       <div className="mb-6 grid grid-cols-3 gap-2">
//         {crops.map((crop) => (
//           <div key={crop.id} className="border p-4">
//             {crop.imageUrl && (
//               <div className="mt-2">
//                 <div style={{ maxWidth: '200px', maxHeight: '200px', overflow: 'hidden' }}>
//                   <img
//                     src={crop.imageUrl}
//                     alt={crop.cropName}
//                     className="max-w-full h-auto"
//                   />
//                 </div>
//                 <h2 className="text-lg font-semibold">{crop.cropName}</h2>
//                 <p>Crop Name: {crop.cropName}</p>
//                 <p>Quantity: {crop.quantity}</p>
//                 <p>Price: {crop.price}</p>
//                 <p>Description: {crop.description}</p>
//                 <div>
//                   <button
//                     // You can add an edit button here if needed
//                     onClick={() => handleEditCrop(crop)}
                   
//                     className="text-blue-500 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     // You can add a delete button here if needed
//                     onClick={() => handleDeleteCrop(crop.id)}
//                     className="ml-2 text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Product;

import React, { useState, useEffect } from "react";
import Crop from "./Crop";
import Animal from "./Animal"
import AnimalProduct from "./AnimalProduct"



function Product() {
  const [selectedCategory, setSelectedCategory] = useState("Crop");

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Render the selected category component
  const renderCategoryComponent = () => {
    switch (selectedCategory) {
      case "Crop":
        return <Crop />;
      case "AnimalProduct":
        return <AnimalProduct />;
      case "Animal":
        return <Animal />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmer Dashboard</h1>

      {/* Category selection */}
      <div className="mb-4">
        <label className="mr-2">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="Crop">Crop</option>
          <option value="AnimalProduct">Animal Product</option>
          <option value="Animal">Animal</option>
        </select>
      </div>

      {/* Render the selected category component */}
      {renderCategoryComponent()}
    </div>
  );
}

export default Product;






