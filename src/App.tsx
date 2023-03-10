import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, Typography } from '@mui/material';
import Login from './features/users/Login';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Cards from './features/cards/Cards';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl" sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <Typography variant="h3" fontWeight="bold" textAlign="center" mt={5}>
                  Page not found!
                </Typography>
              }
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};
export default App;
