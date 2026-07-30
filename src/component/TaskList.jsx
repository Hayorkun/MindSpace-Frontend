import { useTask } from "../context/TaskContext";
import { Edit, Trash2, Calendar } from "lucide-react";

const TaskList = () => {
  const { filteredTasks, isLoading, removeTask, openEditPanel } = useTask();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2">
        <p className="text-gray-500 dark:text-gray-400">No tasks yet</p>
        <p className="text-sm text-gray-400">Create your first task to get started</p>
      </div>
    );
  }

  const statusColor = {
    pending: "bg-yellow-500",
    "in-progress": "bg-blue-500",
    completed: "bg-green-500",
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      {filteredTasks.map((task) => (
        <div
          key={task._id}
          className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3"
        >
          <div className={`w-2 h-2 rounded-full ${statusColor[task.status]}`} />

          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{task.title}</p>
            <p className="text-sm text-gray-500 truncate">{task.description}</p>
          </div>

          <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
            {task.category}
          </span>

          <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">
            {task.priority}
          </span>

          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={14} />
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
          </span>

          <button onClick={() => openEditPanel(task)}>
            <Edit size={16} className="text-gray-500 hover:text-indigo-600" />
          </button>

          <button onClick={() => removeTask(task._id)}>
            <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;