import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/Auth/authSlice";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (isAuthenticated) {
    //   dispatch(fetchUser());
    // }
    dispatch(fetchUser());
    console.log("User", user);
  }, [dispatch, isAuthenticated]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
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
              onClick={handleChangePassword}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
