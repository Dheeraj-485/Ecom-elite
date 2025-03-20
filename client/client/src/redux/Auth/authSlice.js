import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/baseUrl";

const token = localStorage.getItem("token"); // Get stored token
// const user = JSON.parse(localStorage.getItem("user")); // Get stored user data
const user = localStorage.getItem("user");
// ? JSON.parse(localStorage.getItem("user"))
// : null;
const initialState = {
  // user: null,
  user: user || null,
  token: token || null,
  loading: false,
  error: null,
  isAuthenticated: !!token, // true if token exists
};

//Async actions

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, data);
      console.log(response);
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, data);

      toast.success("Login successfull");
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk("user/fetch", async (req, res) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("fetch response user", response);

    // toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response.data.message);
  }
});
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (password) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/auth/update-password`,
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Password response user", response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
      toast.success("Logout successfull");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // state.loading = false;
        // state.isAuthenticated = true;
        // state.user = action.payload;
        console.log(action.payload.user);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.isAuthenticated = true;
        // state.user = action.payload;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Store updated user
        // state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        console.log("Update action", action.payload);
        state.user = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
