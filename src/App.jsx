import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./page/Landingpage";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import DashBoard from "./page/DashBoard";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<DashBoard/>}/>
        </Route>
      </Routes>
  );
}

export default App;
