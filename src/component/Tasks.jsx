import { useTask } from "../context/TaskContext";
import { Edit, Trash2, Calendar, Plus } from "lucide-react";
import CreateTaskPanel from "./CreateTaskPanel";
import EditTaskPanel from "./EditTaskPanel";
import TaskDetail from "./TaskDetail";

const Tasks = () => {
  const {
    filteredTasks,
    isLoading,
    removeTask,
    openEditPanel,
    openCreatePanel,
    openTaskDetails,
    selectedTask,
  } = useTask();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-40 gap-2">
          <p className="text-gray-500 dark:text-gray-400">No tasks yet</p>
          <p className="text-sm text-gray-400">
            Create your first task to get started
          </p>
        </div>

        <button className="fixed bottom-6 right-6 flex gap-1 items-center justify-center bg-indigo-500 px-3 py-2 rounded-full text-gray-200 shadow-lg hover:bg-indigo-600 hover:scale-105 transition">
          <Plus />
          <span className="hidden lg:flex font-body font-medium">New Task</span>
        </button>
      </>
    );
  }

  return (
    <section className="p-5">
      <div className="lg:flex gap-3">
        <div className="lg:flex-3 flex flex-col gap-3">
          {filteredTasks.map((task) => (
            <div
              onClick={() => openTaskDetails(task)}
              key={task._id}
              className={`flex lg:flex-row justify-between items-start border border-gray-400 dark:border-gray-700 dark:bg-gray-800/70 bg-gray-300/70 rounded-lg px-4 py-3 border-l-8 ${
                task.status === "pending"
                  ? "border-l-yellow-500 dark:border-l-yellow-500"
                  : task.status === "in-progress"
                    ? "border-l-blue-500 dark:border-l-blue-500"
                    : "border-l-green-500 dark:border-l-green-500"
              } `}
            >
              <div className="flex items-center gap-2">
                <div>
                  <div className="space-y-2.5">
                    <h2 className="font-medium text-md truncate">
                      {task.title}
                    </h2>
                    <div className="space-x-2.5">
                      <span className="text-xs px-2 lowercase py-1 rounded-full bg-indigo-100 text-indigo-700">
                        {task.category}
                      </span>

                      <span className="text-xs lowercase px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between flex-col gap-6">
                <div className="flex justify-end gap-2">
                  <button onClick={() => openEditPanel(task)}>
                    <Edit
                      size={18}
                      className="text-gray-500 hover:text-indigo-600 cursor-pointer"
                    />
                  </button>
                  <button onClick={() => removeTask(task._id)}>
                    <Trash2
                      size={18}
                      className="text-gray-500 hover:text-red-600 cursor-pointer"
                    />
                  </button>
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={14} />
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No date"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex-1 lg:block p-3 dark:bg-gray-800/70 bg-gray-300/70">
          {selectedTask ? (
            <TaskDetail />
          ) : (
            <p>Select a task to view its details.</p>
          )}
        </div>
      </div>
      <EditTaskPanel />
      <CreateTaskPanel />
      <button
        onClick={openCreatePanel}
        className="fixed bottom-6 right-6 flex gap-1 items-center justify-center bg-indigo-500 px-3 py-2 rounded-full text-gray-200 shadow-lg hover:bg-indigo-600 hover:scale-105 transition"
      >
        <Plus />
        <span className="hidden lg:flex font-body font-medium">New Task</span>
      </button>
    </section>
  );
};

export default Tasks;
