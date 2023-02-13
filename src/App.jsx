import React, { useState } from 'react';

const App = () => {
  const [money, setMoney] = useState(100000);
  const [ownedProperties, setOwnedProperties] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([
    { name: 'Apartment 1', price: 50000, rent: 1000 },
    { name: 'Apartment 2', price: 60000, rent: 1200 },
    { name: 'Apartment 3', price: 65000, rent: 1300 },
    { name: 'Apartment 4', price: 70000, rent: 1400 },
  ]);

  const buyProperty = (property) => {
    if (money >= property.price) {
      setOwnedProperties([...ownedProperties, property]);
      setMoney(money - property.price);
      setAvailableProperties(
        availableProperties.filter((p) => p.name !== property.name)
      );
    } else {
      alert('Not enough money to buy property');
    }
  };

  const collectRent = () => {
    let totalRent = 0;
    ownedProperties.forEach((property) => {
      totalRent += property.rent;
    });
    setMoney(money + totalRent);
  };

  return (
    <div>
      <h1>Rental Property Management Simulator</h1>
      <h2>Money: ${money}</h2>
      <button onClick={collectRent}>Collect Rent</button>
      <h2>Owned Properties:</h2>
      <ul>
        {ownedProperties.map((property, index) => (
          <li key={index}>{property.name} ({property.rent}/month)</li>
        ))}
      </ul>
      <h2>Available Properties:</h2>
      <ul>
        {availableProperties.map((property, index) => (
          <li key={index}>
            {property.name} ({property.price} | {property.rent}/month)
            <button onClick={() => buyProperty(property)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
