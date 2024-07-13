import React from "react";
import { Container, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import ViewTask from "./pages/ViewTask";
import AppBar from "./components/AppBar";

function App() {
  return (
    <Container maxWidth="xl">
      <AppBar />
      <Box my={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/view/:id" element={<ViewTask />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
