// CustomerDropdown.js
import Select from 'react-select';

const CustomerDropdown = ({ handleOptionChange, selectedOption, options }) => {

  const customStyles = {
    control: (base) => ({
      ...base,
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: 'none',
      padding: '7px',
      marginRight: '10px',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }),
  };

  return (
    <Select
      value={selectedOption}
      onChange={(selected) => handleOptionChange(selected)}
      options={options}
      styles={customStyles}
    />
  );
};

export default CustomerDropdown;
