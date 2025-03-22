import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../config/baseUrl";

const initialState = {
  loading: false,
  error: null,
  product: [],
  reviews: [],
  totalPages: 1,
  currentPage: 1,
  selectedProduct: null,
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/products/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      return response.data;

      //   const result = response.json();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAll",
  async ({ page, limit }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/?page=${page}&limit=${limit}`
      );
      console.log("response.data products", response.data);

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const fetchProductById = createAsyncThunk("products/id", async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/${id}`);
    console.log("Fetch by id: ", response.data.product);

    toast.success(response.data.message);
    return response.data.product;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, updatedData }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/products/update/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update api", response);

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/products/${id}`);
    toast.success(response.data.message);
    return id;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const addReview = createAsyncThunk(
  "product/review",
  async ({ productId, reviewData }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/products/${productId}/review`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      console.log("response review", response);

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action fetch", action?.payload);
        // state.product = action.payload;
        state.product = action?.payload?.products;
        state.totalPages = action.payload?.totalPages;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action?.payload;
        console.log("selected product:", action?.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Create product action", action.payload);
        state.product.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        console.log("update action", action.payload);

        state.selectedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter(
          (prod) => prod._id !== action.payload
        );
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.loading = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
