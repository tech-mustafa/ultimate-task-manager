import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../redux/tasksSlice";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, TASK_STATUS } from "../utils/Constants";

// Helper function to check if a date is in the past
const isPastDate = (date) =>
  new Date(date) < new Date(new Date().setHours(0, 0, 0, 0));

const TaskForm = ({ mode, taskId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.find((task) => task.id === parseInt(taskId))
  );

  // Form state
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    category: "",
    status: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Populate form fields if in edit mode
  useEffect(() => {
    if (mode === "edit" && task) {
      setFormValues({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        category: task.category,
        status: task.status,
      });
    }
  }, [mode, task]);

  // Validation function
  const validate = () => {
    const tempErrors = {};
    const { title, description, dueDate, priority, category, status } =
      formValues;

    if (!title) tempErrors.title = "Title is required";
    if (!description) tempErrors.description = "Description is required";
    if (!dueDate) {
      tempErrors.dueDate = "Due date is required";
    } else if (isPastDate(dueDate)) {
      tempErrors.dueDate = "Due date cannot be in the past";
    }
    if (!priority) tempErrors.priority = "Priority is required";
    if (!category) tempErrors.category = "Category is required";
    if (!status) tempErrors.status = "Status is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[name];
      return updatedErrors;
    });
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const taskData = { ...formValues };

    if (mode === "add") {
      dispatch(addTask(taskData));
    } else if (mode === "edit") {
      dispatch(editTask({ id: task.id, ...taskData }));
    }

    navigate("/");
  };

  // Render TextField with common props
  const renderTextField = (label, name, type = "text", InputLabelProps) => (
    <Grid item xs={12} sm={InputLabelProps ? 6 : 12}>
      <TextField
        label={label}
        name={name}
        type={type}
        value={formValues[name]}
        onChange={handleInputChange}
        error={!!errors[name]}
        helperText={errors[name]}
        InputLabelProps={InputLabelProps}
        fullWidth
      />
    </Grid>
  );

  // Render SelectField with common props
  const renderSelectField = (label, name, options) => (
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth error={!!errors[name]}>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          value={formValues[name]}
          onChange={handleInputChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {errors[name] && <p className="error">{errors[name]}</p>}
      </FormControl>
    </Grid>
  );

  return (
    <Box component={Paper} p={3} mb={3}>
      <form onSubmit={handleSubmit}>
        {Object.keys(errors).length > 0 && (
          <Alert severity="error">Please fix the error(s) below</Alert>
        )}
        <Grid container spacing={2}>
          {renderTextField("Title", "title")}
          {renderTextField("Description", "description")}
          {renderTextField("Due Date", "dueDate", "date", { shrink: true })}
          {renderSelectField("Priority", "priority", ["Low", "Medium", "High"])}
          {renderSelectField("Category", "category", CATEGORIES)}
          {renderSelectField("Status", "status", TASK_STATUS)}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              {mode === "add" ? "Add Task" : "Save Changes"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TaskForm;
