import FootTab from "../component/FootTab";
import NavTab from "../component/NavTab";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { githubLogin, googleLogin, signup } = useAuth();

  const SocialLink = [
    {
      icon: FcGoogle,
      name: "Google",
    },
    {
      icon: FaGithub,
      name: "GitHub",
    },
  ];

  const [errors, setErrors] = useState({});
  const [isAgreed, setIsAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    isRemembered: false,
  });

  const handleChange = (f) => {
    setFormData({
      ...formData,
      [f.target.name]: f.target.value,
    });

    setErrors({
      ...errors,
      [f.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};

    if (!formData.fullName.trim()) {
      newError.fullName = "Fullname required";
    }
    if (!formData.email.trim()) {
      newError.email = "Email required";
    }
    if (!formData.password.trim()) {
      newError.password = "Password required";
    }

    setErrors(newError);

    if (Object.keys(newError).length > 0) return;

    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        form:
          error.response?.data?.message || "Signup failed. Please try again.",
      });
    }
  };

  return (
    <>
      <NavTab />
      <section className="py-20 dark:bg-[#0d1117] bg-gray-100 dark:text-white">
        <div className="px-5 md:px-10">
          <div className="flex flex-col max-w-lg mx-auto min-h-120">
            <div className="mb-7">
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl leading-tight tracking-wide">
                Create your account
              </h1>
              <p className="font-body font-normal text-base leading-relaxed md:tracking-wider">
                Start organizing your work and life for free.
              </p>
            </div>
            <form className="mb-5 flex flex-col gap-5">
              {errors.form && (
                <p className="font-body text-sm text-red-500 text-center">
                  {errors.form}
                </p>
              )}
              <label
                htmlFor="email"
                className="flex flex-col gap-5 font-body text-lg font-medium"
              >
                {" "}
                Full name
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  onChange={handleChange}
                  value={formData.fullName}
                  className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 h-10 px-2 rounded-md text-base font-normal"
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="font-body text-xs text-red-500 -mt-3">
                    {errors.fullName}
                  </p>
                )}
              </label>
              <label
                htmlFor="email"
                className="flex flex-col gap-5 font-body text-lg font-medium"
              >
                {" "}
                Email address
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 h-10 px-2 rounded-md text-base font-normal"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="font-body text-xs text-red-500 -mt-3">
                    {errors.email}
                  </p>
                )}
              </label>
              <label
                htmlFor="password"
                className="flex flex-col gap-5 font-body text-lg font-medium "
              >
                <div className="flex justify-between items-center">
                  Password
                  <NavLink className="text-sm text-indigo-600">
                    Forgot password?
                  </NavLink>
                </div>
                <input
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 h-10 px-2 rounded-md text-base font-normal"
                  placeholder="Min. 8 character"
                />
                {errors.password && (
                  <p className="font-body text-xs text-red-500 -mt-3">
                    {errors.password}
                  </p>
                )}
              </label>
              <label
                htmlFor="checkbox"
                className="font-body text-sm font-normal text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                  className="w-4 h-4 border-2 border-gray-600 dark:border-gray-500 rounded-sm"
                />
                I agree to
                <NavLink className="font-medium text-indigo-500">
                  Terms of service
                </NavLink>{" "}
                and{" "}
                <NavLink className="font-medium text-indigo-500">
                  Privacy policy
                </NavLink>
                .
              </label>

              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-indigo-600 py-2 rounded-lg text-lg text-white"
              >
                Create free account
              </button>
            </form>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px dark:bg-gray-600 bg-gray-400" />
              <span className="text-gray-400 font-body">OR</span>
              <div className="flex-1 h-px dark:bg-gray-600 bg-gray-400" />
            </div>
            <div className="flex items-center gap-3 mb-5">
              {SocialLink.map((s, i) => {
                const Icon = s.icon;

                const handleClick = () => {
                  if (s.name === "Google") {
                    googleLogin();
                  } else if (s.name === "GitHub") {
                    githubLogin();
                  }
                };
                return (
                  <button
                    onClick={handleClick}
                    key={i}
                    className="flex-1 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 gap-2 rounded-lg py-2.5 font-body text-base"
                  >
                    <Icon /> {s.name}
                  </button>
                );
              })}
            </div>
            <p className="text-center font-body font-normal text-base leading-relaxed dark:text-gray-400 text-gray-500">
              Already have an account?{" "}
              <NavLink to="/signin" className="ml-1 text-indigo-600">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
      <FootTab />
    </>
  );
};

export default SignUp;
