import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createProduct,
  fetchProductById,
  updateProduct,
} from "../redux/productSlice";
import { useParams } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const params = useParams();
  // console.log("Edit product", params.id);
  // const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProd = async () => {
      if (params.id) {
        const { payload } = await dispatch(fetchProductById(params.id));
        console.log("product payload ---------------------------", payload);
        if (payload) {
          setValue("title", payload.title);
          setValue("description", payload.description);
          setValue("price", payload.price);
          setValue("category", payload.category);
          setValue("brand", payload.brand);
          setValue("stock", payload.stock);
          // Set the existing image preview
          setValue("thumbnail", payload?.thumbnail?.url);
          // setValue("thumbnail", payload?.thumbnail);
          // setImage(payload?.thumbnail?.url);
          setImagePreview(payload?.thumbnail?.url);
          // setValue("thumbnail", imagePreview?.thumbnail?.url);
          console.log("response edit", payload);
        }
      }
    };

    fetchProd();
  }, [params.id, setValue, dispatch]);
  // console.log("===========form data ==============",)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
  };
  // console.log(image, handleImageChange);

  const onSubmit = async (data) => {
    // setLoading(true);
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("stock", data.stock);
    if (image) {
      formData.append("thumbnail", image); // Append actual image file
    }

    console.log("FormData content:", [...formData]); // Debugging
    try {
      if (params.id) {
        await dispatch(updateProduct({ id: params.id, updatedData: formData }));
      } else {
        await dispatch(createProduct(formData));
      }
    } catch (error) {
      console.error("Error updating/creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="  p-4 flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" w-full max-w-lg space-y-6  rounded-lg shadow-lg p-8 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-semibold text-2xl text-center mb-6">
            Create Product
          </h2>

          <div className="flex flex-col mb-4 ">
            <label className="text-gray-500 font-medium">Title:</label>
            <input
              className="border-gray-300 border  p-2  rounded-lg   "
              type="text"
              {...register("title", { required: "Title is required" })}
              name="title"
              placeholder="Enter Product title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4 ">
            <label className="text-gray-500 font-medium">Description:</label>
            <textarea
              className="border border-gray-300  p-2 rounded-lg   "
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
              name="description"
              placeholder="Enter Product Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4 ">
            <label className="text-gray-500 font-medium">Price:</label>
            <input
              className=" border border-gray-300 p-2 rounded-lg  "
              type="number"
              {...register("price", { required: "Price is required" })}
              name="price"
              placeholder="Enter Product Price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4 ">
            <label className="text-gray-500 font-medium">Category:</label>
            <input
              className=" border border-gray-300  p-2  rounded-lg   "
              {...register("category", { required: "Category is required" })}
              type="text"
              name="category"
              placeholder="Enter Product Category"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4 ">
            <label className="text-gray-500 font-medium">Brand:</label>
            <input
              className="border border-gray-300 p-2 rounded-lg   "
              type="text"
              {...register("brand", { required: "Brand is required" })}
              name="brand"
              placeholder="Enter Product brand"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          <div className="flex flex-col m-1 p-1 ">
            <label className="text-gray-500 font-medium">Stock:</label>
            <input
              className="border border-gray-300 p-2  rounded-lg   "
              type="text"
              {...register("stock", { required: "Stock is required" })}
              name="stock"
              placeholder="Enter Product Stock"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4 ">
            <label className="text-gray-500 font-medium">thumbnail:</label>
            <input
              className="border border-gray-300 p-2  rounded-lg   "
              type="file"
              // {...register("thumbnail", { required: "Image is required" })}
              // name="thumbnail"
              // value={image}
              accept="image/*"
              onChange={handleImageChange}
              placeholder="Enter Product Image"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
            {errors.imagePreview && (
              <p className="text-red-500 text-sm">
                {errors.imagePreview.message}
              </p>
            )}
          </div>
          {/* <button
            type="submit"
            // type=""
            disabled={loading ? true : false}
            className="w-full bg-green-300 p-2 font-semibold m-2 text-xl cursor-pointer"
          >
            {params.id ? "Update" : "Create"}
          </button> */}

          <button
            type="submit"
            disabled={isSubmitting ? true : false}
            className={`w-full p-2 font-semibold m-2 text-xl cursor-pointer ${
              isSubmitting ? "bg-gray-300" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isSubmitting ? "Processing..." : params.id ? "Update" : "Create"}
            {/* {isSubmitting ? "Processing..." : "Update"} */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
