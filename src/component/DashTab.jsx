import { NavLink } from "react-router-dom";
import Images from "../assets/image";
import { BellDot } from "lucide-react";
import { useAuth } from "../context/AuthContext"

const DashTab = () => {
  const { user } = useAuth()
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="h-15 px-5 md:px-10 flex items-center justify-between">
        <NavLink className="flex gap-1 items-baseline">
          <img src={Images.Planning} alt="Logo image" className="w-5 h-5" />
          <h1 className="font-heading text-xl md:text-2xl">
            <strong>
              Mind<span className="text-indigo-500">Space</span>
            </strong>
          </h1>
        </NavLink>

        <div>
          <BellDot className="hidden md:flex"/>

          <div>{user?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default DashTab;
