import { Outlet } from "react-router-dom";
import { useTask } from "../context/TaskContext";

const DashTab = () => {
  const Options = ["All tasks", "Pending", "In progress", "Completed"];
  const { activeFilter, setActiveFilter } = useTask();

  return (
    <section className="dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col md:flex-row md:h-164 h-screen w-full border-t dark:border-gray-300/50">
        <div className="flex md:flex-col justify-between md:justify-start h-15 w-full md:w-[20%] md:h-full border-b md:border-b-0 md:border-r darK:border-gray-400 p-5 gap-5">
          {Options.map((O, i) => (
            <button
              onClick={() => setActiveFilter(O)}
              style={{
                backgroundColor: activeFilter === O ? "#111828" : "#1e2938",
              }}
              key={i}
            >
              <p>{O}</p>
            </button>
          ))}
        </div>
        <div className="w-[85%]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashTab;
