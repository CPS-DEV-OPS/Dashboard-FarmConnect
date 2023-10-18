import React, { useState } from 'react';

function RadioButtonGroup() {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
     
      <label>
        <input
          type="radio"
          value="Farmer"
          checked={selectedOption === 'Farmer'}
          onChange={handleOptionChange}
        />
        Farmer      </label>

      <label>
        <input
          type="radio"
          value="Buyer"
          checked={selectedOption === 'Buyer'}
          onChange={handleOptionChange}
        />
       Buyer
      </label>

      <label>
        <input
          type="radio"
          value="Transporter"
          checked={selectedOption ==='Transporter'}
          onChange={handleOptionChange}
        />
        Transporter
      </label>

    
    </div>
  );
}

export default RadioButtonGroup;
