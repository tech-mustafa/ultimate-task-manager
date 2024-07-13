import React from "react";
import { Typography, AppBar as Bar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <Bar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/add">
          Add Task
        </Button>
      </Toolbar>
    </Bar>
  );
};

export default AppBar;
