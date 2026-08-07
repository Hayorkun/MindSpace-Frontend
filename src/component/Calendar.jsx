import { useState, useMemo } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  parseISO,
} from "date-fns";
import { useTask } from "../context/TaskContext";
import CreateTaskPanel from "./CreateTaskPanel";
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { tasks, openCreatePanel } = useTask();

  // Navigation handlers
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Generate grid days including padding days from adjacent months
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentMonth]);

  const tasksByDate = useMemo(() => {
    const map = {};

    for (const task of tasks) {
      if (!task.dueDate) continue;
      const key = format(parseISO(task.dueDate), "yyyy-MM-dd");

      if (!map[key]) map[key] = [];
      map[key].push(task);
    }

    return map;
  }, [tasks]);

  return (
    <div className="w-full dark:bg-gray-900 p-6 h-full overflow-y-auto">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="lg:text-xl text-md font-bold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <div className="flex gap-1">
            <button
              onClick={prevMonth}
              className="p-1 px-3 rounded bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 hover:dark:bg-gray-700 transition"
            >
              &lt;
            </button>
            <button
              onClick={nextMonth}
              className="p-1 px-3 rounded bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 hover:dark:bg-gray-700 transition"
            >
              &gt;
            </button>
          </div>
        </div>
        <button onClick={openCreatePanel} className="bg-indigo-600 text-white hover:bg-indigo-500 text-sm font-medium px-4 py-2 rounded-lg transition">
          + Schedule Event
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center font-semibold text-xs text-gray-600 dark:text-gray-400 mb-2 border border-gray-600 dark:border-gray-600">
        {DAYS.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-600 dark:bg-gray-600 rounded-lg overflow-hidden border border-gray-600 dark:border-gray-600">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const dayTasks = tasksByDate[key] || [];
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <div
              key={day.toString()}
              className={`min-h-25 p-2 flex flex-col justify-between ${
                !isCurrentMonth
                  ? "dark:bg-gray-900 bg-gray-300"
                  : "dark:bg-gray-800 bg-gray-400"
              }`}
            >
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                {format(day, "d")}
              </span>

              {/* Render Task Badges */}
              <div className="flex flex-col gap-1 mt-1 max-h-20">
                {dayTasks.map((task) => (
                  <div
                    key={task._id}
                    className={`text-[10px] font-medium p-1.5 text-white rounded-md truncate ${
                      task.status === "pending"
                        ? "bg-yellow-500 dark:bg-yellow-500"
                        : task.status === "in-progress"
                          ? "bg-blue-500 dark:bg-blue-500"
                          : "bg-green-500 dark:bg-green-500"
                    }`}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <CreateTaskPanel/>
    </div>
  );
}
