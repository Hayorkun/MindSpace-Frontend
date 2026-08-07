import { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { XIcon, Trash } from "lucide-react";

const EditTaskPanel = () => {
  const { isPanelOpen, closePanel, editTask, editingTask, clearEditingTask, removeTask, } =
    useTask();

  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    category: "personal",
    status: "pending",
  };

  const [taskData, setTaskData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setTaskData({
        title: editingTask.title,
        description: editingTask.description || "",
        dueDate: editingTask.dueDate?.split("T")[0] || "",
        priority: editingTask.priority,
        category: editingTask.category,
        status: editingTask.status,
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setTaskData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
      form: "",
    }));
  };

  const handleCancel = () => {
    setTaskData(initialState);
    closePanel();
    setErrors({});
    clearEditingTask();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newError = {};

    if (!taskData.title.trim()) {
      newError.title = "Title required";
    }

    setErrors(newError);

    if (Object.keys(newError).length > 0) return;

    try {
      setSubmitting(true);
      await editTask(editingTask._id, taskData);
      setTaskData(initialState);
      clearEditingTask();
      closePanel();
    } catch (error) {
      setErrors({
        form: error.response?.data?.message || "Error editing task.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isPanelOpen !== "edit" || !editingTask) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
        onClick={submitting ? undefined : handleCancel}
      />

      <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
        <div
          className="w-90 lg:w-150 rounded-xl bg-gray-300/80 dark:bg-gray-900 py-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex px-6 justify-between items-start mb-5 lg:mb-7 border-b border-gray-400 dark:border-gray-700">
            <div>
              <h2 className="text-gray-700 dark:text-gray-400 font-heading font-bold text-2xl lg:text-3xl leading-tight mb-1">
                Edit Task
              </h2>
              <p className="font-body text-sm lg:text-md text-gray-700 dark:text-gray-400 leading-relaxed lg:tracking-wider">
                Update the details of your task.
              </p>
            </div>
            <button
              onClick={handleCancel}
              disabled={submitting}
              className="cursor-pointer"
            >
              <XIcon />
            </button>
          </div>
          {errors.form && (
            <div role="alert" className=" h-10 p-1 bg-red-400 text-white flex text-center">
              <p className="font-body text-sm">{errors.form}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="px-6 space-y-5 mb-5">
              <label
                htmlFor="title"
                className="flex text-gray-600 dark:text-gray-400 flex-col gap-3 text-md font-medium font-body leading-relaxed"
              >
                Task Name
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  className="border dark:border-gray-600 border-gray-500 bg-gray-400/50 dark:bg-gray-700 rounded-md px-1.5 py-1 text-sm lg:h-10 lg:text-md text-black dark:text-white"
                  placeholder="e.g. Q1 financial audit"
                />
                {errors.title && (
                  <p className="font-body text-xs text-red-500">
                    {errors.title}
                  </p>
                )}
              </label>
              <label
                htmlFor="description"
                className="flex text-gray-600 dark:text-gray-400 flex-col gap-3 text-md font-medium font-body leading-relaxed"
              >
                Description
                <textarea
                  id="description"
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  placeholder="Briefly outline the core objective"
                  className="text-black dark:text-white border p-2 dark:border-gray-600 border-gray-500 bg-gray-400/50 dark:bg-gray-700 rounded-md  text-sm h-17 lg:h-25 lg:text-md"
                />
              </label>
              <div className="flex justify-between gap-5 lg:gap-10">
                <label
                  htmlFor="dueDate"
                  className="flex flex-1 flex-col text-gray-600 dark:text-gray-400 gap-2 text-md font-medium font-body leading-relaxed"
                >
                  Due Date
                  <input
                    id="dueDate"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                    type="date"
                    className="border dark:border-gray-600 border-gray-500 bg-gray-400/50 dark:bg-gray-700 rounded-md h-8 lg:h-10 text-black dark:text-white"
                  />
                </label>
                <label
                  htmlFor="priority"
                  className="flex flex-1 flex-col text-gray-600 dark:text-gray-400 gap-2 text-md font-medium font-body leading-relaxed"
                >
                  Priority
                  <select
                    id="priority"
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    className="border dark:border-gray-600 border-gray-500 bg-gray-400/50 dark:bg-gray-700 rounded-md h-8 lg:h-10 text-black dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
              </div>
              <div className="flex gap-5">
                <label
                  htmlFor="status"
                  className="flex flex-1 flex-col text-gray-600 dark:text-gray-400 gap-2 text-md font-medium font-body leading-relaxed"
                >
                  Status
                  <select
                    id="status"
                    name="status"
                    value={taskData.status}
                    onChange={handleChange}
                    className="border dark:border-gray-600 border-gray-500 bg-gray-400/50 dark:bg-gray-700 rounded-md h-8 lg:h-10 text-black dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
                <label
                  htmlFor="category"
                  className="flex flex-1 flex-col text-gray-600 dark:text-gray-400 gap-2 text-md font-medium font-body leading-relaxed"
                >
                  Category
                  <select
                    id="category"
                    name="category"
                    value={taskData.category}
                    onChange={handleChange}
                    className="border dark:border-gray-600 border-gray-500 bg-gray-400/50 dark:bg-gray-700 rounded-md h-8 lg:h-10 text-black dark:text-white"
                  >
                    <option value="personal">Personal</option>
                    <option value="finance">Finance</option>
                    <option value="health">Health</option>
                    <option value="work">Work</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="flex justify-between border-t items-center px-6 py-2 border-gray-400 dark:border-gray-700">
              <button onClick={removeTask} type="button" className="flex items-center text-xs text-red-300 lg:text-sm font-body leading-relaxed gap-1">
                <Trash className="size-4"/> Delete Task
              </button>
              <div className="space-x-5 text-xs lg:text-sm">
                <button
                className="font-body text-gray-600 dark:text-gray-300  cursor-pointer"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                disabled={submitting}
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-normal font-body rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating task" : "Update task"}
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTaskPanel;
