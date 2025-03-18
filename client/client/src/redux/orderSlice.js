import axios from "axios";
import { BASE_URL } from "../config/baseUrl";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  orders: [],
  //   order: null,
  adminOrders: [],
  loading: false,
  error: null,
};

//Place an order
export const placeOrder = createAsyncThunk(
  "orders/create",
  async (orderData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/order/checkout`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      console.log("order api", response.data.order._id);

      return response.data.order;
    } catch (error) {
      return toast.error(error?.response?.data.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk("order/fetch", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/order/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);

    toast.success(response.data.message);
    return response.data.orders;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response?.data?.message || "Failed to fetch orders";
  }
});

export const fetchOrderById = createAsyncThunk(
  "order/fetchById",
  async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      return response.data.orders;
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  }
);

//Cancel order
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${BASE_URL}/api/order/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order cancel api", response);
      toast.success(response.data.message);
      //   return response.data.orders;
      return orderId;
    } catch (error) {
      return toast.error(error?.response.data.message);
    }
  }
);

//Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllAdmin",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/order/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetch admin orders", response);

      toast.success(response.data.message);
      return response.data.orders;
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  }
);

//Update order status (Admin)
export const updateOrderStatus = createAsyncThunk(
  "order/updateorderstatus",
  async ({ status, orderId }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/order/admin/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fetch by id", response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        console.log("order", action.payload);

        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        console.log("user orders", action.payload);
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action cancel", action.payload);
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload;
        console.log(action.payload);
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = state.adminOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      });
  },
});

export default orderSlice.reducer;
