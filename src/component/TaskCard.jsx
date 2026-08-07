import { Calendar, MoreHorizontal } from "lucide-react";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-gray-300 dark:bg-gray-700 rounded-lg p-4 mt-3 shadow-sm border border-gray-400 dark:border-gray-600">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{task.title}</h3>

        <button className="cursor-pointer">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-1 text-sm">
          <Calendar size={16} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>

        <span className="px-2 py-1 rounded-full text-xs bg-indigo-500 text-white">
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;