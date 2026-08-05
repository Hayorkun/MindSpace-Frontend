import { Plus, } from "lucide-react";
import { useTask } from "../context/TaskContext";
import { SlCalender, SlCheck } from "react-icons/sl";
import { CgDanger } from "react-icons/cg";
import { GiSandsOfTime } from "react-icons/gi";
import TaskCard from "./TaskCard";
import CreateTaskPanel from "./CreateTaskPanel";

const DashboardHome = () => {
  const { openCreatePanel, tasks } =
    useTask();


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
      <CreateTaskPanel/>
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
