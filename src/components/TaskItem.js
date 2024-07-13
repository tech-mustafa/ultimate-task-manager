import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../redux/tasksSlice";
import {
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Grid,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const TaskItem = ({ task }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <Box
      component={Paper}
      mb={2}
      p={2}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      position="relative"
    >
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Checkbox
            checked={task.status === "Completed"}
            onChange={() => dispatch(toggleTaskCompletion(task.id))}
          />
        </Grid>
        <Grid item xs={10}>
          <ListItemText
            primary={task.title}
            secondary={`Description: ${task.description} - Due: ${task.dueDate} - Priority: ${task.priority} - Status: ${task.status}`}
          />
        </Grid>
        <Grid item xs={2}>
          {hovered && (
            <ListItemSecondaryAction className={"actions-container"}>
              <IconButton component={Link} to={`/edit/${task.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
              <IconButton component={Link} to={`/view/${task.id}`}>
                <OpenInFullIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskItem;
