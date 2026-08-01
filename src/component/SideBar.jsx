import { Outlet, NavLink } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import Images from "../assets/image"

const SideBar = () => {
  const Options = [];
  const { activeFilter, setActiveFilter } = useTask();

  return (
    // <section className="dark:bg-gray-900 dark:text-white">
    //   <div className="flex flex-col md:flex-row md:h-164 h-screen w-full border-t dark:border-gray-300/50">
    //     <div className="border-b md:border-b-0 md:border-r darK:border-gray-400 p-5 gap-5">
    //       {Options.map((O, i) => (
    //         <button
    //           onClick={() => setActiveFilter(O)}
    //           style={{
    //             backgroundColor: activeFilter === O ? "#111828" : "#1e2938",
    //           }}
    //           key={i}
    //         >
    //           <p>{O}</p>
    //         </button>
    //       ))}
    //     </div>
    //     <div className="w-[85%]">
    //       <Outlet />
    //     </div>
    //   </div>
    // </section>

    <section className="dark:bg-gray-900 dark:text-white">
      <div className="grid grid-cols-12">
        <div className="sticky col-span-3 top-0 h-screen border">
          <div className="py-5 px-3 lg:px-7 h-full dark:bg-gray-900 hidden md:flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="mb-10">
               <NavLink to="/dashboard" className="flex gap-1 items-baseline">
            <img src={Images.Planning} alt="Logo image" className="w-5 h-5" />
            <h1 className="font-heading text-xl md:text-2xl">
              <strong>
                Mind<span className="text-indigo-500">Space</span>
              </strong>
            </h1>
          </NavLink>
              </div>
              <div className="flex flex-col text-md gap-7 font-semibold">
                <NavLink to="/dashboard" className="flex items-center gap-2">
                  Dashboard
                </NavLink>
                <NavLink to="/recording" className="flex items-center gap-2">
                  New Recording
                </NavLink>
                <NavLink to="/settings" className="flex items-center gap-2">
                  Settings
                </NavLink>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t h-15 border-white/15">
              <img className="w-7 h-7 rounded-full object-contain" src="" />
              <p className="font-semibold text-sm"></p>
            </div>
          </div>
        </div>
        <div className="col-span-9 lg:col-span-10 p-5">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default SideBar;
