import axios from "axios";
import { BASE_URL } from "../config/baseUrl";
import toast from "react-hot-toast";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  //   cartItems: [],
  //   totalPrice: 0,
  cart: null,
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(response.data.message);
    return response.data.cart;
  } catch (error) {
    return toast.error(error.response.data.message);
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ quantity, productId }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/cart/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      return response.data.cart;
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/cart/update/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      return response.data.cart;
    } catch (error) {
      return toast.error(error.respose.data.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      return response.data.cart;
    } catch (error) {
      toast.error(error?.respose?.data.message);
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${BASE_URL}/api/cart/clear`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.cart;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
      });
  },
});

export default cartSlice.reducer;
