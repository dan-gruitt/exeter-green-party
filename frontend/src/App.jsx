import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Addresses from './pages/Addresses.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth={false} sx={{ pt: { xs: 7, sm: 8 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addresses" element={<Addresses />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;