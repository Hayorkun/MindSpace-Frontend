import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All tasks");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchTask = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/tasks/getTask`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/api/tasks/createTask`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setTasks((prevTasks) => [...prevTasks, res.data.data]);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const editTask = async (id, formData) => {
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `${API_BASE}/api/tasks/updateTask/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const updatedTask = res.data.data;

      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTask = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${API_BASE}/api/tasks/deleteTask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "All tasks") return true;
    if (activeFilter === "Pending") return task.status === "pending";
    if (activeFilter === "In progress") return task.status === "in-progress";
    if (activeFilter === "Completed") return task.status === "completed";
    return true;
  });

  const openCreatePanel = () => {
    setEditingTask(null);
    setIsPanelOpen(true);
  };

  const openEditPanel = (task) => {
    setEditingTask(task);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditingTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        fetchTask,
        tasks,
        isLoading,
        addTask,
        editTask,
        removeTask,
        activeFilter,
        setActiveFilter,
        filteredTasks,
        isPanelOpen,
        editingTask,
        openCreatePanel,
        openEditPanel,
        closePanel,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  return useContext(TaskContext);
}
