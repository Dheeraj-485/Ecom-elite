import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, changePassword } from "../redux/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import AdminOrders from "./AdminOrders";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatePassword, setUpdatePassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userData, setUserData] = useState([]);

  useEffect(() => {
    // if (isAuthenticated) {
    //   dispatch(fetchUser());
    // }
    // const getData = async () => {
    //   try {
    //     const { payload } = await dispatch(fetchUser());
    //     console.log(
    //       "============================== res ================================",
    //       payload
    //     );
    //     setUserData(payload);
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };
    // getData();
    // console.log("User", user);
    const fetchf = async () => {
      await dispatch(fetchUser());
    };
    fetchf();
  }, [isAuthenticated, dispatch]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  const handleChangePassword = async () => {
    try {
      setIsSubmitting(true);
      setIsChangingPassword(false);
      await dispatch(changePassword(updatePassword));
      await dispatch(fetchUser());

      // setIsAuthenticated(true);
    } catch (error) {
      console.log("Error changing password");
    } finally {
      setIsSubmitting(false);
    }

    // console.log(changePassword(updatePassword));s
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <>
      <div className="border p-4 m-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {user?.userName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Role:</strong> {user?.role}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setIsChangingPassword(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {isChangingPassword && (
          <div className="flex">
            <form onSubmit={handleChangePassword}>
              <input
                type="password"
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
                placeholder="Enter Update Password"
                className="border  p-2 m-2 rounded-xl "
              />
              <button
                type="submit"
                className="bg-green-400 text-white rounded-xl p-2 m-1"
              >
                {isSubmitting ? "Updating..." : "Update "}
              </button>
              <button
                className="bg-red-500 text-white  rounded-xl p-2 m-1"
                type="button"
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
      {user?.role === "admin" && <AdminOrders />}
    </>
  );
};

export default UserProfile;
