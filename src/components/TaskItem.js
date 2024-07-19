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

const TaskItem = ({ task, searchTerm }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      dispatch(deleteTask(task.id));
    }
  };

  const findWord = (w, term, newTtle) => {
    const index = w.indexOf(term);
    const firstLetters = w.substring(0, index);
    const second = w.substring(index, index + term.length);
    const third = w.substring(index + term.length);
    //we have word that contains the searchterm
    //break the word into 3 parts, 1. initial letters, 2 highlighted letter, 3 end letters
    let title = (
      <>
        {newTtle} {firstLetters}
        <span style={{ backgroundColor: "yellow" }}>{second}</span>
        {third}
      </>
    );
    // term.length create a sbstr, find if word matched, reccursion of the function;

    const newString = w.substring(index + term.length);
    const hasMore = newString.includes(term);
    if (hasMore) {
      // title = findWord(newString, term, newTtle);
    }

    return title;
  };
  const renderTitle = (title) => {
    //return the title with highlihted term

    const isKeywordAvailable = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (!isKeywordAvailable || !searchTerm) return title;

    let newTtle;
    title.split(" ").forEach((w) => {
      const word = w.toLowerCase();
      const term = searchTerm.toLowerCase();
      if (word.includes(term)) {
        newTtle = findWord(w, word, term, newTtle);
      } else {
        newTtle = (
          <>
            {newTtle} {word}
          </>
        );
      }
    });
    return newTtle;
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
            primary={renderTitle(task.title)}
            secondary={renderTitle(
              `Description: ${task.description} - Due: ${task.dueDate} - Priority: ${task.priority} - Status: ${task.status}`
            )}
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
