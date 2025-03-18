// // import ProductDetail from "../Components/ProductDetail/ProductDetail";
// // import { useContext, useEffect, useState } from "react";
// // // import { Tost } from "../Components/Tost";
// // import { useLocation, useParams } from "react-router-dom";
// // // import Api from "../ApiInfo/ApiInfo";

// // import axios from "axios";
// // import { LoadingProductDetails } from "../Components/ProductDetail/LoadingProductDetails";
// // import { BASE_URL } from "../config/baseUrl";
// // import { useDispatch } from "react-redux";
// // import { fetchProductById } from "../redux/productSlice";
// // // import ApiInfo from "../ApiInfo/ApiInfo";
// // // import Context from "../Context/Context";

// // export default function ProductDetails() {
// //   const { Cart, SetCart } = useContext(Context);
// //   const [Quantity, SetQuantity] = useState(1);
// //   const [Review, setReview] = useState("");
// //   const [Star, setStar] = useState(0);
// //   const [Loading, setLoading] = useState(false);

// //   function onQuntityChange(value) {
// //     SetQuantity(value);
// //   }

// //   function onReviewTextChange(value) {
// //     setReview(value);
// //   }

// //   function getReviewStar(value) {
// //     setStar(value);
// //   }

// //   async function onPostReviewPress() {
// //     setLoading(true);
// //     if (Review === "") {
// //       Tost("Please fill review");
// //       setLoading(false);
// //       return;
// //     }
// //     if (Star === 0) {
// //       Tost("Please select star for product");
// //       setLoading(false);
// //       return;
// //     }
// //     await axios.put(
// //       BASE_URL + "/review",
// //       {
// //         productId: id,
// //         comment: Review,
// //         rating: Star,
// //       },
// //       {
// //         withCredentials: true,
// //       }
// //     );
// //     setLoading(false);
// //     Tost("Thank you for your review.");
// //     await FetchDetails();
// //   }

// //   const { id } = useParams();
// //   const [loading, setloading] = useState(false);
// //   const [data, setData] = useState({});

// //   function Pressed(id) {
// //     const Dummy = [...Cart];
// //     for (let i = 0; i < Dummy.length; i++) {
// //       if (Dummy[i].id === id) {
// //         Tost("Item Already Added To Cart");
// //         return;
// //       }
// //     }
// //     Dummy.push({
// //       id: data._id,
// //       name: data.name,
// //       price: data.price,
// //       image: data.images[0].url,
// //       quality: Quantity,
// //       maxQuantity: data.Stock,
// //       discount: data.discount,
// //     });
// //     SetCart(Dummy);
// //     Tost("Item Added to cart.");
// //   }
// //   const dispatch = useDispatch();
// //   const params = useParams();
// //   async function FetchDetails() {
// //     const result = await dispatch(fetchProductById(params.id));
// //     console.log(result.data.Product);
// //     setData(result.data.Product);
// //   }

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //     setloading(true);
// //     FetchDetails().then((_) => {
// //       setloading(false);
// //     });
// //     return () => {};
// //   }, [id]);

// //   return (
// //     <>
// //       {loading === false ? (
// //         <ProductDetail
// //           productId={id}
// //           images={
// //             data.images ?? [
// //               {
// //                 url: "https://img.freepik.com/free-photo/textured-background-white-tone_53876-128610.jpg",
// //               },
// //             ]
// //           }
// //           title={data.name}
// //           averageReview={data.ratings}
// //           discountedPrice={
// //             data.price - parseInt((data.price * data.discount) / 100)
// //           }
// //           totalPrice={data.price}
// //           discription={data.description}
// //           onReviewTextChange={onReviewTextChange}
// //           onQuntityChange={onQuntityChange}
// //           getReviewStar={getReviewStar}
// //           reviews={data.reviews ?? []}
// //           onAddToCart={Pressed}
// //           maxStock={data.Stock ?? 0}
// //           onPostReviewPress={onPostReviewPress}
// //           Star={Star}
// //           Loading={Loading}
// //           key={data}
// //         />
// //       ) : (
// //         <LoadingProductDetails />
// //       )}
// //     </>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductById } from "../redux/productSlice";

// const ProductDetails = () => {
//   const params = useParams();
//   //   console.log(params);
//   useEffect(() => {
//     console.log("Params:", params); // Debugging
//   }, [params]);

//   //   const [product, setProduct] = useState(null);
//   const { selectedProduct: product } = useSelector((state) => state.products);

//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         // const { data } = await axios.get(`/products/${productId}`);
//         const data = dispatch(fetchProductById(params.id));
//       } catch (error) {
//         toast.error("Failed to load product details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [params.id, dispatch]);
//   console.log("product", product);

//   if (loading) return <div className="text-center p-5">Loading...</div>;
//   //   if (!product)
//   //     return (
//   //       <div className="text-center p-5 text-red-500">Product not found</div>
//   //     );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Product Image */}
//         <img
//           src={product?.thumbnail?.url}
//           alt={product?.title}
//           className="w-full h-80 object-cover rounded-lg shadow-md"
//         />

//         {/* Product Info */}
//         <div>
//           <h1 className="text-3xl font-bold">{product?.title}</h1>
//           <p className="text-gray-600">{product?.description}</p>
//           <p className="text-2xl font-semibold mt-3">₹{product?.price}</p>

//           {/* Ratings */}
//           <div className="flex items-center gap-1 mt-2">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <FaStar
//                 key={index}
//                 className={
//                   index < product?.rating ? "text-yellow-400" : "text-gray-300"
//                 }
//               />
//             ))}
//             <span className="text-gray-500 ml-2">
//               ({product?.numReviews} reviews)
//             </span>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             className="bg-blue-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
//             onClick={() => toast.success("Added to cart!")}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-3">Customer Reviews</h2>
//         {product?.reviews?.length > 0 ? (
//           product?.reviews.map((review, index) => (
//             <div key={index} className="border p-4 rounded-lg shadow-sm my-2">
//               <p className="font-semibold">{review.user}</p>
//               <div className="flex items-center">
//                 {Array?.from({ length: 1 }).map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={
//                       i < review.rating ? "text-yellow-400" : "text-gray-300"
//                     }
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-600">{review.comment}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No reviews yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addReview, fetchProductById } from "../redux/productSlice";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  //   const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(null);
  const { selectedProduct: product, reviews } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await dispatch(fetchProductById(params.id));
      } catch (error) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [dispatch, reviews, params.id]);

  //   const handleSubmitReview = async (e) => {
  //     e.preventDefault();
  //     if (rating === 0) {
  //       toast.error("Please select a star rating");
  //       return;
  //     }

  //     const newReview = { user: "Guest User", rating, comment: reviewText };

  //     try {
  //       await axios.post(`/products/${productId}/reviews`, newReview);
  //       setProduct((prev) => ({
  //         ...prev,
  //         reviews: [...prev.reviews, newReview],
  //       }));
  //       toast.success("Review added successfully!");
  //       setReviewText("");
  //       setRating(0);
  //     } catch (error) {
  //       toast.error("Failed to add review");
  //     }
  //   };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      text: reviewText,
    };
    dispatch(addReview({ productId: params.id, reviewData }));
    setReviewText("");
    setRating(0);
  };
  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!product)
    return (
      <div className="text-center p-5 text-red-500">Product not found</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Animated Product Image */}
        <motion.img
          src={product.thumbnail.url}
          alt={product.title}
          className="w-full h-80 object-cover rounded-lg shadow-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold mt-3">₹{product.price}</p>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < product.rating ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-500 ml-2">
              ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Add to Cart Button with Animation */}
          <motion.button
            className="bg-blue-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              dispatch(addToCart({ productId: product._id, quantity: 1 }))
            }
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-3">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className=" p-4 rounded-lg shadow-sm my-2">
              <p className="font-semibold">{review.user.userName}</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </motion.div>

      {/* Write a Review Section */}
      <motion.div
        className="mt-8 p-5 border-sky-50 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-3">Write a Review</h2>
        {/* Star Rating */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={`cursor-pointer transition ${
                index < (hoverRating || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>

        <form onSubmit={handleReviewSubmit}>
          {/* Review Input */}
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            rows="3"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="bg-green-500 text-white px-5 py-2 rounded-lg mt-3 hover:bg-green-600 transition"
            whileTap={{ scale: 0.9 }}
          >
            Submit Review
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
