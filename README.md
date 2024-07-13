# Ultimate Task Manager

## Project Overview

The Ultimate Task Manager is a task management application built with React, Material-UI (MUI), Redux, and redux-toolkit. The application allows users to create, view, edit, and delete tasks. It also includes features such as task filtering, sorting, and search functionality.

## Features

- Add new tasks with title, description, due date, priority, and status.
- Edit existing tasks.
- Mark tasks as completed.
- Delete tasks.
- Filter tasks based on status (All, Completed, Pending).
- Sort tasks by priority and due date.
- Search tasks by title or description.
- Responsive design that works well on both desktop and mobile devices.
- Error handling and validation for user input fields.
- Data persistence using localStorage.

## Project Structure

```
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── TaskForm.js
│   │   ├── TaskItem.js
│   │   └── TaskList.js
│   ├── redux
│   │   ├── store.js
│   │   └── tasksSlice.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md
```

### Components

- **TaskForm.js**: Form component for adding and editing tasks.
- **TaskItem.js**: Component for displaying individual tasks with options to edit or delete.
- **TaskList.js**: Component for displaying the list of tasks with search, filter, and sort functionalities.

### Redux

- **store.js**: Configures the Redux store.
- **tasksSlice.js**: Contains the tasks slice with actions and reducers for managing task state.

## External Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Material-UI (MUI)**: A popular React UI framework for designing components.
- **Redux**: A predictable state container for JavaScript apps.
- **redux-toolkit**: A middleware that allows writing functions with logic inside that interact with a Redux store.
- **react-router-dom**: For handling routing in the React application.

## Demo

[link to App](https://ultimate-task-manager.netlify.app/)

## Installation and Running the Application

### Prerequisites

- Node.js and npm should be installed on your machine.

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ultimate-task-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**

   ```bash
   npm start
   ```

4. **Open the application in your browser**
   The application will be running at `http://localhost:3000`.

## Usage

- To add a new task, click on the "Add Task" button.
- To edit or delete a task, use the edit and delete icons on the task item.
- Use the search bar to find specific tasks by title or description.
- Use the filter dropdown to filter tasks based on their status.
- Use the sort buttons to sort tasks by priority or due date.
