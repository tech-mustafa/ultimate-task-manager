import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography, Box, Paper } from "@mui/material";

const ViewTask = () => {
  const { id } = useParams();
  const task = useSelector((state) =>
    state.tasks.find((task) => task.id === parseInt(id))
  );

  if (!task) {
    return <Typography variant="h5">Task not found</Typography>;
  }

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" gutterBottom>
        {task.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {task.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Due Date: {task.dueDate}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Priority: {task.priority}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Category: {task.category}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Status: {task.status}
      </Typography>
    </Box>
  );
};

export default ViewTask;
