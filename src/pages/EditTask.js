import React from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

const EditTask = () => {
  const { id } = useParams();
  return (
    <div>
      <TaskForm mode="edit" taskId={id} />
    </div>
  );
};

export default EditTask;
