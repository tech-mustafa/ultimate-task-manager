import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { CATEGORIES, TASK_STATUS } from "../utils/Constants";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState({ type: "None", direction: "asc" });

  const handleSort = (type) => {
    setSort((prevSort) => ({
      type,
      direction:
        prevSort.type === type && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchTermMatch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        task.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim());

      const statusMatch = status === "All" || task.status === status;

      const categoryMatch = category === "All" || task.category === category;

      return searchTermMatch && statusMatch && categoryMatch;
    });
  }, [category, searchTerm, status, tasks]);

  const sortedTasks = useMemo(() => {
    return filteredTasks.sort((a, b) => {
      if (sort.type === "Priority") {
        const priorities = { High: 1, Medium: 2, Low: 3 };
        return sort.direction === "asc"
          ? priorities[a.priority] - priorities[b.priority]
          : priorities[b.priority] - priorities[a.priority];
      } else if (sort.type === "DueDate") {
        return sort.direction === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      } else {
        return 0;
      }
    });
  }, [filteredTasks, sort.direction, sort.type]);

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h5" component="h3" gutterBottom>
        Tasks
      </Typography>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {TASK_STATUS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          onClick={() => handleSort("Priority")}
          endIcon={
            sort.type === "Priority" &&
            (sort.direction === "asc" ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            ))
          }
        >
          Sort by Priority
        </Button>
        <Button
          variant="contained"
          onClick={() => handleSort("DueDate")}
          endIcon={
            sort.type === "DueDate" &&
            (sort.direction === "asc" ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            ))
          }
        >
          Sort by Due Date
        </Button>
      </Box>
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} searchTerm={searchTerm?.trim()} />
      ))}
    </Box>
  );
};

export default TaskList;
