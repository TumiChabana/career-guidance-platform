import React, { useEffect, useState } from 'react';
import axios from './api/axios';

function App() {
  const [message, setMessage] = useState('Testing connection...');

  useEffect(() => {
    axios.get('/test')
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage('Connection failed: ' + err.message));
  }, []);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Career Guidance Platform</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;