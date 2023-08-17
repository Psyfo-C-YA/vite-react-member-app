import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON server
    axios
      .get('http://localhost:3001/posts')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Save data to local storage
  const saveToLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(data));
    console.log('Data saved to local storage');
  };

  // Load data from local storage
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('data');
    if (savedData) {
      setData(JSON.parse(savedData));
      console.log('Data loaded from local storage');
    }
  };

  return (
    <div>
      <h4>Data Display</h4>
      <button onClick={saveToLocalStorage}>Save to Local Storage</button>
      <button onClick={loadFromLocalStorage}>Load from Local Storage</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <div>Name: {item.name}</div>
            <div>Job: {item.job}</div>
            <img src={item.selectedImage} alt="Selected" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayData;
