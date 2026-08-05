import { Plus, XIcon } from "lucide-react";
import { useTask } from "../context/TaskContext";
import { useState } from "react";
import { SlCalender, SlCheck } from "react-icons/sl";
import { CgDanger } from "react-icons/cg";
import { GiSandsOfTime } from "react-icons/gi";
import TaskCard from "./TaskCard";

const DashboardHome = () => {
  const { openCreatePanel, isPanelOpen, closePanel, addTask, tasks } =
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

  const handleCancel = () => {
    setTaskData(initialState);
    closePanel();
  };

  const handleChange = (f) => {
    setTaskData((prev) => ({
      ...prev,
      [f.target.name]: f.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(taskData);

    try {
      setSubmitting(true);
      await addTask(taskData);
      setTaskData(initialState);
      closePanel();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const Stats = [
    {
      title: "Task due today",
      icon: SlCalender,
      color: "text-indigo-600",
      count: 0,
    },
    {
      title: "Completed this week",
      icon: SlCheck,
      color: "text-cyan-500",
      count: 0,
    },
    {
      title: "Overdue",
      icon: CgDanger,
      color: "text-red-600",
      count: 0,
    },
    {
      title: "In progress",
      icon: GiSandsOfTime,
      color: "dark:text-white text-black",
      count: 0,
    },
  ];

  const filterTask = [
    {
      title: "Pending",
      status: "pending",
    },
    {
      title: "In Progress",
      status: "in-progress",
    },
    {
      title: "Completed",
      status: "completed",
    },
  ];

  return (
    <div className="p-5">
      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {Stats.map((s, i) => {
            const Icon = s.icon;

            return (
              <div
                key={i}
                className={`border-2 border-gray-400 dark:border-gray-600 rounded-md dark:bg-gray-700 bg-gray-300 p-2 ${
                  i < 2 ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex justify-between">
                  <p className="font-body text-sm font-medium leading-relaxed">
                    {s.title}
                  </p>
                  <Icon className={s.color} />
                </div>
                <p className="font-body text-xl font-medium leading-relaxed">
                  {s.count}
                </p>
              </div>
            );
          })}
        </div>
        {/* DESKTOP VIEW */}
        <div className="hidden lg:grid lg:w-full lg:grid-cols-3 gap-5">
          {filterTask.map((f, i) => {
            const columnTasks = tasks.filter(
              (task) => task.status === f.status,
            );

            return (
              <div className="" key={i}>
                <div className="flex justify-between items-center">
                  <p className="font-body font-semibold text-xl dark:text-gray-400 text-gray-600 leading-relaxed ">
                    {f.title}
                  </p>
                  <button onClick={openCreatePanel} className="cursor-pointer">
                    <Plus />
                  </button>
                </div>
                {columnTasks.length === 0 ? (
                  <p className="mt-4 text-sm text-gray-500 flex justify-center">
                    No tasks yet
                  </p>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))
                )}
              </div>
            );
          })}
        </div>
        {/* MOBILE VIEW */}
      </div>
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
      <button
        onClick={openCreatePanel}
        className="fixed bottom-6 right-6 flex gap-1 items-center justify-center bg-indigo-500 px-3 py-2 rounded-full text-gray-200 shadow-xl hover:bg-indigo-600 hover:scale-105 transition cursor-pointer"
      >
        <Plus />
        <span className="hidden lg:flex font-body font-medium">New Task</span>
      </button>
    </div>
  );
};

export default DashboardHome;
