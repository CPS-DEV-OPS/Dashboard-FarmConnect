import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Additional() {
    const [selectedCounty, setSelectedCounty] = useState('');
    const countiesList = [
       
  'Mombasa',
 'Kwale',
 'Kilifi',
 'Tana River',
 'Lamu',
 'Taita/Taveta',
 'Garissa',
  'Wajir',
  'Mandera',
   'Marsabit',
 'Isiolo',
  'Meru',
 'Tharaka-Nithi',
 'Embu',
 'Kitui',
 'Machakos',
 'Makueni',
 'Nyandarua',
 'Nyeri',
 "Kirinyaga",
  'Muranga',
 'Kiambu',
 'Turkana',
 'West Pokot',
 'Samburu',
 'Trans Nzoia',
 'Uasin Gishu',
 'Elgeyo/Marakwet',
 'Nandi',
 'Baringo',
 'Laikipia',
 'Nakuru',
 'Narok',
 'Kajiado',
 'Kericho',
 'Bomet',
 'Kakamega',
 'Vihiga',
'Bungoma',
 'Busia',
 'Siaya',
 'Kisumu',
 'Homa Bay',
 'Migori',
 'Kisii',
 'Nyamira',
 'Nairobi City',
      ];
    const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(`${latitude}, ${longitude}`);
          setError(null);
        },
        (err) => {
          setError('Error getting location: ' + err.message);
        }
      );
    } else {
      setError('Geolocation is not supported in this browser.');
    }
  };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      
      
        setSelectedCounty(event.target.value);
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          // const registrationId = localStorage.getItem('registrationId'); // Retrieve the Registration ID from localStorage
          const registrationId = localStorage.getItem('registrationId');
      
          const response = await fetch(`https://localhost:7079/Auth/UpdateUser/${registrationId}`, {
            method: 'PUT',
            headers: {
              
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              registrationId: registrationId, // Assuming registrationid corresponds to registrationid
              dob: selectedDate,
              phoneNumber: formData.phoneNumber,
              // dob: formData.dob,
              county: selectedCounty,
              gpsLocation: formData.location,
              // Add other fields as needed
            }),
          });
      
          if (response.ok) {
            // Handle success
          } else {
            // Handle error
          }
        } catch (error) {
          // Handle network errors or other issues
        }
      };
      
      
    
      // const handleSubmit = (event) => {
      //   event.preventDefault();
      //   // You can handle form submission here, e.g., send data to an API or process it in your component.
      //   console.log('Form submitted with data:', formData);
      // };
    
  const [selectedOption, setSelectedOption] = useState('Farmer');
  const [showForm, setShowForm] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowForm(event.target.value === 'Farmer'); // Display the form when 'Farmer' is selected
  };
  const [selectedCountry, setSelectedCountry] = useState('');

 
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-4 text-center">Please Select a Role</h1>

      <div className="flex justify-center space-x-4 mb-4">
        <label className="block">
          <input
            type="radio"
            value="Farmer"
            checked={selectedOption === 'Farmer'}
            onChange={handleOptionChange}
          />
          <span className="ml-2">Farmer</span>
        </label>

        <label className="block">
          <input
            type="radio"
            value="Buyer"
            checked={selectedOption === 'Buyer'}
            onChange={handleOptionChange}
          />
          <span className="ml-2">Buyer</span>
        </label>

        <label className="block">
          <input
            type="radio"
            value="Transporter"
            checked={selectedOption === 'Transporter'}
            onChange={handleOptionChange}
          />
          <span className="ml-2">Transporter</span>
        </label>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Phone Number:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label>Date of Birth:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()} // To prevent selecting future dates
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label>County:</label>
            <select
              value={selectedCounty}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a county</option>
              {countiesList.map((county, index) => (
                <option key={index} value={county}>
                  {county}
                </option>
              ))}
            </select>
            
          </div>

          <div className="mb-4">
            <h1>GPS Location</h1>
            <button
              onClick={handleGetLocation}
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Get My Location
            </button>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              value={location}
              readOnly
              className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="GPS Location"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Additional;