// import { motion } from "framer-motion";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { signupUser } from "../redux/Auth/authSlice";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({ userName: "", email: "", password: "" });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(signupUser(form));
//   };

//   return (
//     <motion.div
//       className=" min-h-screen flex flex-col justify-center items-center p-6 bg-linear-to-r/srgb from-indigo-500 to-teal-400"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <div className="bg-white justify-center items-center p-6 m-3 rounded-md space-y-7 ">
//         <h1 className="text-3xl font-bold text-center">Signup</h1>
//         <form className="w-80 space-y-4" onSubmit={handleSubmit}>
//           <input
//             className="p-2 w-full border rounded"
//             type="text"
//             placeholder="UserName"
//             onChange={(e) => setForm(e.target.value)}
//           />
//           <input
//             className="p-2 w-full border rounded"
//             type="email"
//             placeholder="Email"
//             onChange={(e) => setForm(e.target.value)}
//           />
//           <input
//             className="p-2 w-full border rounded"
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setForm(e.target.value)}
//           />

//           <button className="bg-blue-500 text-white p-2 rounded w-full">
//             Signup
//           </button>
//         </form>
//       </div>

//       <p className="mt-4">
//         Already have an account?{" "}
//         <Link className="text-blue-600" to="/login">
//           Login
//         </Link>
//       </p>
//     </motion.div>
//   );
// };

// export default Signup;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/Auth/authSlice";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      // Simulate sending a welcome email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save user data (Replace this with an actual API call)
      //   const res = await axios.post(`${BASE_URL}/auth/signup`, data);

      //   toast.success(res.data.message);
      dispatch(signupUser(data));

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <motion.div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <motion.div
          className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h2 className="text-2xl font-bold text-center text-white">
            Sign Up for Ecommerce
          </h2>

          {successMessage && (
            <p className="text-green-400 text-center">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-gray-300">Username</label>
              <input
                {...register("userName", { required: "Username is required" })}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-white rounded-lg focus:outline-none"
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-white rounded-lg focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-300">Password</label>
              <input
                type={passwordVisible ? "password" : "text"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-white rounded-lg focus:outline-none"
                placeholder="Create a password"
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
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-gray-300">Confirm Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-white rounded-lg focus:outline-none"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-gray-300">Profile Picture</label>
              <input
                type="file"
                className="w-full px-2 py-1 text-gray-900 bg-white rounded-lg focus:outline-none"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center text-gray-300">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms",
                })}
                className="mr-2"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Terms & Conditions
                </a>
              </span>
            </div>
            {errors.terms && (
              <p className="text-red-500">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 text-white rounded-lg ${
                isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Signup;
