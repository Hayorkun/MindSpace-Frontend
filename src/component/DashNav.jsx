import { NavLink } from "react-router-dom";
import Images from "../assets/image";
import { BellDot, Menu, XIcon, Sun, Moon, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import useTheme from "../context/useTheme";

const DashNav = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const Options = ["All tasks", "Pending", "In progress", "Completed"];

  const NavStyle = ({isActive}) => ({
    backGround: isActive ? "#111828" : "#1e2938"
  })

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-100 sticky top-0">
      <div className="h-15 px-5 md:px-10 flex items-center justify-between">
        <div className="flex items-start gap-2.5">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden cursor-pointer">
            {isOpen ? <XIcon /> : <Menu />}
          </button>
          <NavLink to="/dashboard" className="flex gap-1 items-baseline">
            <img src={Images.Planning} alt="Logo image" className="w-5 h-5" />
            <h1 className="font-heading text-xl md:text-2xl">
              <strong>
                Mind<span className="text-indigo-500">Space</span>
              </strong>
            </h1>
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          <BellDot className="" />
          <button onClick={toggleTheme} className="hidden md:flex">
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <NavLink className="w-10 h-10 rounded-full bg-indigo-600 flex justify-center items-center">
            <h1 className="font-heading font-bold text-white">
              {getInitials(user?.fullName)}
            </h1>
          </NavLink>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 top-14.5 z-40">
          <div
            className={`h-full w-6/12 inset-y-0 p-5 left-0 fixed bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out overflow-scroll
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex flex-col gap-3">
              {Options.map((O, i) => (
                <div key={i} className="flex flex-col">
                  <NavLink className="py-1.5" style={NavStyle}>
                    <p className="font-body font-medium text-xl dark:text-gray-300">
                      {O}
                    </p>
                  </NavLink>
                </div>
              ))}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                <p className="font-body font-medium text-xl dark:text-gray-300">
                  Theme
                </p>
                <button
                  onClick={toggleTheme}
                  className="p-1 bg-gray-300/20 rounded-md cursor-pointer"
                >
                  {theme === "dark" ? <Sun /> : <Moon />}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-body font-medium text-xl dark:text-gray-300">
                  Settings
                </p>
                <NavLink className="p-1 bg-gray-300/20 rounded-md">
                  <Settings />
                </NavLink>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashNav;
