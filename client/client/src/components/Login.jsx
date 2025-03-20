// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../redux/Auth/authSlice";

// const Login = () => {
//   const [data, setData] = useState({ email: "", password: "" });
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(data));
//   };
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-linear-to-r/srgb from-indigo-500 to-teal-400 ">
//       <div className=" max-w-screen bg-white p-5 m-3 rounded-md space-y-4 ">
//         <h2 className="text-3xl text-center font-semibold">Login</h2>

//         <form className="w-80  " onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className="w-full rounded-md bg-gray-200 p-3 my-2  "
//             placeholder="Enter Email"
//             value={data.email}
//             onChange={(e) => setData(e.target.value)}
//           />
//           <input
//             type="password"
//             className="w-full rounded-md bg-gray-200  p-3 my-2 "
//             placeholder="Enter Password"
//             value={data.password}
//             onChange={(e) => setData(e.target.value)}
//           />
//           <button className="w-full bg-blue-400 hover:bg-blue-300 p-3 text-xl text-white mt-2 rounded-lg">
//             {" "}
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setUser } from "../redux/Auth/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await dispatch(loginUser(data));

      if (rememberMe) {
        localStorage.setItem("email", response.email);
      } else {
        localStorage.removeItem("email");
      }
      console.log("Response login", response);

      toast.success(response.data.message);
      if (response?.payload) {
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.payload.user));

        navigate("/");
        console.log(response.data.token);
      } else {
        toast.error("Invalid cred");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <motion.div
        className="flex items-center justify-center min-h-screen bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h2
            className="text-2xl font-bold text-center text-white"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Login to MelodyVerse
          </motion.h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-300">Email or Username</label>
              <input
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-white rounded-lg focus:outline-none"
                placeholder="Enter your email or username"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </motion.div>

            {/* Password Field */}

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <label className="block text-gray-300">Password</label>
              <input
                type={passwordVisible ? "password" : "text"}
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-white rounded-lg focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </motion.div>

            {/* Remember Me and Forgot Password */}
            <motion.div
              className="flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <Link
                to="/request-reset"
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              disabled={isSubmitting ? true : false}
            >
              {isSubmitting ? "Wait..." : "Login"}
            </motion.button>
          </form>

          {/* Signup Redirect */}
          <motion.p
            className="text-center text-gray-400"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
