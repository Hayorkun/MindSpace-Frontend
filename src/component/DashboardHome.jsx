import { Plus } from "lucide-react";


const DashboardHome = () => {
  return (
    <div className="p-5 flex flex-col justify-between">
      <div className=""></div>
      <button className="fixed bottom-6 right-6 flex gap-1 items-center justify-center bg-indigo-500 px-3 py-2 rounded-full text-gray-200 shadow-lg hover:bg-indigo-600 hover:scale-105 transition">
        <Plus />
        <span className="hidden lg:flex font-body font-medium">New Task</span>
      </button>
    </div>
  );
};

export default DashboardHome;
