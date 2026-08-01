import { useState } from "react";
import {
  Menu,
  XIcon,
  Sun,
  Moon,
  LayoutDashboardIcon,
  Calendar,
  ListChecks,
  Settings2,
  LogOut,
  Search,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Images from "../assets/image";
import useTheme from "../context/useTheme";
import { useAuth } from "../context/AuthContext";

const DashBoard = () => {
  const { theme, toggleTheme } = useTheme();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isDashboardHome = location.pathname === "/dashboard";

  const NavItems = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Tasks",
      to: "/dashboard/tasks",
      icon: ListChecks,
    },
    {
      name: "Calendar",
      to: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      name: "Settings",
      to: "/dashboard/settings",
      icon: Settings2,
    },
  ];

  return (
    <div className="flex bg-gray-200 dark:bg-gray-900 dark:text-white h-screen">
      {/* sidebar */}
      <div
        className={`fixed z-50 w-60 h-screen bg-gray-100 dark:bg-gray-800 shadow transform transition-transform duration-300 ease-in-out ${sideBarOpen ? "translate-x-0" : "-translate-x-60"} lg:translate-x-0 lg:static`}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center p-4 border-b border-gray-400 dark:border-gray-600">
              <NavLink to="/dashboard" className="flex gap-1 items-baseline">
                <img
                  src={Images.Planning}
                  alt="Logo image"
                  className="w-5 h-5"
                />
                <h1 className="font-heading text-ml md:text-2xl">
                  <strong>
                    Mind<span className="text-indigo-500">Space</span>
                  </strong>
                </h1>
              </NavLink>
              <button
                onClick={() => setSideBarOpen(false)}
                className="lg:hidden"
              >
                <XIcon />
              </button>
            </div>
            <div className="space-y-4 p-4">
              {NavItems.map((n, i) => {
                const Icon = n.icon;
                return (
                  <NavLink
                    key={i}
                    to={n.to}
                    end={n.to === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-1 rounded-sm ${isActive ? "bg-indigo-500 text-white" : "dark:hover:bg-gray-900 hover:bg-gray-300"}`
                    }
                  >
                    <Icon className="size-5" />
                    <p className="font-body font-medium text-lg">{n.name}</p>
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="h-15 border-t border-gray-400 dark:border-gray-600 flex items-center justify-between p-4 gap-2">
            <div className="flex gap-2">
              <img
                src={user?.avatar_url}
                alt="User icon"
                className="w-8 h-8 rounded-full "
              />
              <div>
                <p className="font-body font-medium text-sm">
                  {user?.fullName}
                </p>
                <p className="font-body text-xs">{user?.plan}</p>
              </div>
            </div>
            <button onClick={logout}>
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </div>
      {sideBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSideBarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1">
        <header className="flex p-5 justify-between">
          <button className="lg:hidden" onClick={() => setSideBarOpen(true)}>
            <Menu />
          </button>
          <div className="flex gap-5 items-center">
            <h1 className="font-heading font-bold text-2xl lg:text-3xl">
              Dashboard
            </h1>
            {isDashboardHome && (
              <div className="hidden lg:flex rounded-md border px-2 w-60 h-full gap-2 border-gray-400 bg-gray-300 dark:border-gray-600 dark:bg-gray-700 items-center">
                <Search />
                <input
                  type="text"
                  className="outline-0 font-body text-lg"
                  placeholder="Search tasks"
                />
              </div>
            )}
          </div>
          <button onClick={toggleTheme} className="">
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </header>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
