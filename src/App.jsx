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
  const [tenants, setTenants] = useState([]);
  const [gameOver, setGameOver] = useState(false);

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

  const sellProperty = (property) => {
    setOwnedProperties(ownedProperties.filter((p) => p.name !== property.name));
    setAvailableProperties([...availableProperties, property]);
    setMoney(money + property.price * 0.9);
  };

  const findTenants = (property) => {
    if (money >= property.rent) {
      if (Math.random() > 0.2) {
        const newTenant = {
          property: property.name,
          duration: Math.ceil(Math.random() * 5),
        };
        setTenants([...tenants, newTenant]);
        setMoney(money - property.rent);
      } else {
        alert('No tenants found');
      }
    } else {
      alert('Not enough money to find tenants');
    }
  };

  const collectRent = () => {
    let totalRent = 0;
    tenants.forEach((tenant) => {
      const property = ownedProperties.find((p) => p.name === tenant.property);
      if (property) {
        totalRent += property.rent;
        tenant.duration -= 1;
      }
    });
    setMoney(money + totalRent);
    setTenants(tenants.filter((tenant) => tenant.duration > 0));
  };

  const restartGame = () => {
    setMoney(100000);
    setOwnedProperties([]);
    setAvailableProperties([
      { name: 'Apartment 1', price: 50000, rent: 1000 },
      { name: 'Apartment 2', price: 60000, rent: 1200 },
      { name: 'Apartment 3', price: 65000, rent: 1300 },
      { name: 'Apartment 4', price: 70000, rent: 1400 },
    ]);
    setTenants([]);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div>
        <h1>Game Over</h1>
        <button onClick={restartGame}>Play Again</button>
      </div>
    );
  }

  if (money <= 0 && tenants.length === 0) {
    setGameOver(true);
  }
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={restartGame}>Play Again</button>
    </div>
  );
}

if (money <= 0 && tenants.length === 0) {
  setGameOver(true);
}

return (
  <div>
    <h1>Rental Property Management Simulator</h1>
    <h2>Money: ${money}</h2>
    <button onClick={collectRent}>Collect Rent</button>
    <h2>Owned Properties:</h2>
    <ul>
      {ownedProperties.map((property, index) => (
        <li key={index}>
          {property.name} ({property.rent}/month)
          {tenants.find((tenant) => tenant.property === property.name) ? (
            <p>Tenant ({tenants.find((tenant) => tenant.property === property.name).duration} months left)</p>
          ) : (
            <button onClick={() => findTenants(property)}>Find Tenants</button>
          )}
          <button onClick={() => sellProperty(property)}>Sell</button>
        </li>
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
