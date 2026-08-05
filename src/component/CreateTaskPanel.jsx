import { XIcon } from "lucide-react";
import { useState } from "react";
import { useTask } from "../context/TaskContext";

const CreateTaskPanel = () => {
  const {
    isPanelOpen,
    closePanel,
    addTask,
  } = useTask();

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

  const handleChange = (e) => {
    setTaskData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setTaskData(initialState);
    closePanel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await addTask(taskData);

      setTaskData(initialState);

      closePanel();
    } finally {
      setSubmitting(false);
    }
  };

  if (!isPanelOpen) return null;

  return (
    <>
   {isPanelOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
            onClick={closePanel}
          />

          <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
            <div
              className="w-90 lg:w-150 rounded-xl bg-gray-300/80 dark:bg-gray-900 py-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex px-6 justify-between items-start mb-5 lg:mb-7 border-b border-gray-400 dark:border-gray-700">
                <div>
                  <h2 className="text-gray-700 dark:text-gray-400 font-heading font-bold text-2xl lg:text-3xl leading-tight mb-1">
                    Create New Task
                  </h2>
                  <p className="font-body text-sm lg:text-md text-gray-700 dark:text-gray-400 leading-relaxed lg:tracking-wider">
                    Add the details of your ext high-performance objective
                  </p>
                </div>
                <button onClick={closePanel} className="cursor-pointer">
                  <XIcon />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="px-6 space-y-5 mb-5">
                  <label
                    htmlFor="title"
                    className="flex text-gray-600 dark:text-gray-400 flex-col gap-3 text-md font-medium font-body leading-relaxed"
                  >
                    Task Name
                    <input
                      type="text"
                      name="title"
                      value={taskData.title}
                      onChange={handleChange}
                      className="border dark:border-gray-600 border-gray-500 bg-gray-400/50 dark:bg-gray-700 rounded-md px-1.5 py-1 text-sm lg:h-10 lg:text-md text-black dark:text-white"
                      placeholder="e.g. Q1 financial audit"
                    />
                  </label>
                  <label
                    htmlFor="description"
                    className="flex text-gray-600 dark:text-gray-400 flex-col gap-3 text-md font-medium font-body leading-relaxed"
                  >
                    Description
                    <textarea
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
                  <button
                    className="font-body text-gray-600 dark:text-gray-300 cursor-pointer"
                    type="reset"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={submitting}
                    type="submit"
                    className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-normal font-body rounded-md cursor-pointer"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateTaskPanel;