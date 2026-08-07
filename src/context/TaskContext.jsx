/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [isPanelOpen, setIsPanelOpen] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tasks");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchTask = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!token) {
        setTasks([]);
        return;
      }

      const { data } = await axios.get(`${API_BASE}/api/tasks/getTask`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(data.data || []);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE, token]);

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
      throw error;
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

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task)),
      );
    } catch (error) {
      console.log(error.response?.data);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeTask = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/tasks/deleteTask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "Tasks") return true;
    if (activeFilter === "Pending") return task.status === "pending";
    if (activeFilter === "In progress") return task.status === "in-progress";
    if (activeFilter === "Completed") return task.status === "completed";
    return true;
  });

  const openCreatePanel = () => {
    setEditingTask(null);
    setIsPanelOpen("create");
  };

  const openEditPanel = (task) => {
    setEditingTask(task);
    setIsPanelOpen("edit");
  };

  const closePanel = () => {
    setIsPanelOpen(null);
    setEditingTask(null);
  };

  const clearEditingTask = () => {
    setEditingTask(null);
  };

  const openTaskDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
    setIsDetailsOpen(false);
  };

  useEffect(() => {
    if (!token) return;

    const loadTasks = async () => {
      await fetchTask();
    };

    void loadTasks();
  }, [fetchTask, token]);

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
        clearEditingTask,
        selectedTask,
        isDetailsOpen,
        openTaskDetails,
        closeTaskDetails,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  return useContext(TaskContext);
}
