import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config/baseUrl";

const VerifyMail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your Email...");
  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link...");
      return;
    }
    const verify = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/auth/verify-email/${token}`
        );
        if (response.status === 200) {
          setMessage(response.data.message);
        }
        setTimeout(() => navigate("/login", 5000));
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
      </div>
    </div>
  );
};

export default VerifyMail;
