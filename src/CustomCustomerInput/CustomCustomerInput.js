import { useState } from "react";
import './Style.css';

const CustomCustomerInput = ({ handleCustomCustomer }) => {

  const [customerNumber, setCustomerNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  return (
    <div className={'container'}>   
        <input
        type='text'
        value={customerNumber}
        onChange={(e) => setCustomerNumber(e.target.value)}
        placeholder='Customer number'
        />

        <input
        type='text'
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder='Customer name'
        />

        <button onClick={() => handleCustomCustomer(customerNumber, customerName)}>Update</button>
    </div>
  );
};

export default CustomCustomerInput;
