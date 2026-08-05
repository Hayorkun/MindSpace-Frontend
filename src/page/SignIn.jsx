import FootTab from "../component/FootTab";
import NavTab from "../component/NavTab";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const {
    googleLogin,
    githubLogin,
    signin,
    setLoading,
    authError,
    clearAuthError,
  } = useAuth();
  const [submitting, setSubmitting] = useState(false);

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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isRemembered: false,
  });

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  const handleChange = (f) => {
    clearAuthError();

    setFormData((prev) => ({
      ...prev,
      [f.target.name]: f.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [f.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};

    if (!formData.email.trim()) {
      newError.email = "Email required";
    }
    if (!formData.password.trim()) {
      newError.password = "Password required";
    }

    setErrors(newError);

    if (Object.keys(newError).length > 0) return;

    try {
      setSubmitting(true);
      setLoading(true);
      await signin(formData);
    } catch (error) {
      setErrors({
        form:
          error.response?.data?.message || "Sign in failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
      setLoading(false);
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
                Sign in to Mindspace
              </h1>
              <p className="font-body font-normal text-base leading-relaxed md:tracking-wider">
                Enter your credentials to access your workspace.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mb-5 flex flex-col gap-5">
              {authError && (
                <p className="font-body text-sm text-red-500 text-center">
                  {authError}
                </p>
              )}
              <label
                htmlFor="email"
                className="flex flex-col gap-5 font-body text-lg font-medium"
              >
                {" "}
                Email address
                <input
                  type="email"
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
                  <NavLink
                    to="/forgot-password"
                    className="text-sm text-indigo-600"
                  >
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
                  placeholder="********"
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
                  id="checkbox"
                  type="checkbox"
                  checked={formData.isRemembered}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isRemembered: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 border-2 border-gray-600 dark:border-gray-500 rounded-sm"
                />
                Remember me for 30 days
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 py-2 rounded-lg text-lg text-white hover:bg-indigo-500 transition-colors ease-linear duration-200 hover:scale-101 active:scale-98"
              >
                {submitting ? "Signing in...." : "Sign in"}
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

                const handleClick = async () => {
                  setSubmitting(true);
                  if (s.name === "Google") {
                    googleLogin();
                  } else if (s.name === "GitHub") {
                    githubLogin();
                  } 
                };

                return (
                  <button
                    type="button"
                    onClick={handleClick}
                    disabled={submitting}
                    key={i}
                    className="flex-1 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 gap-2 rounded-lg py-2.5 font-body text-base hover:scale-102 hover:opacity-90 active:scale-98 ease-linear transition-all duration-100"
                  >
                    <Icon /> {s.name}
                  </button>
                );
              })}
            </div>
            <p className="text-center font-body font-normal text-base leading-relaxed dark:text-gray-400 text-gray-500">
              Don't have an account?{" "}
              <NavLink to="/signup" className="ml-1 text-indigo-600">
                Create one for free
              </NavLink>
            </p>
          </div>
        </div>
      </section>
      <FootTab />
    </>
  );
};

export default SignIn;
