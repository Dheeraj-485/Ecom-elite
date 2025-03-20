import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from ""; // Assuming you have this action
import { ProductCard } from "../components/ProductCard";
import { fetchAllProduct } from "../redux/productSlice";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Image1 from "/Images/Img1.jpg";
import Image2 from "/Images/Img2.jpg";
import Image3 from "/Images/Img3.jpg";
import HomeSecond from "./CaraousalPage";
import Testimonial from "./Testimonial";
import { motion } from "framer-motion";
import { fetchUser } from "../redux/Auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // const user = localStorage.getItem("token");
  // const user = localStorage.getItem("token");
  // const user = localStorage.getItem("user");
  // console.log("user home", user);

  const { product } = useSelector((state) => state.products);
  const [sortOption, setSortOption] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(fetchUser());
  //   }
  // }, [dispatch, isAuthenticated]);
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("User data:", user);
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser()); // Re-fetch user details on reload
    }
  }, [dispatch]);
  useEffect(() => {
    // if (isAuthenticated) {
    //   dispatch(fetchUser());
    // }
    dispatch(fetchAllProduct());
  }, [dispatch]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "React.js is an amazing library for building scalable applications!",
    },
    {
      id: 2,
      name: "Sarah Smith",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "Tailwind CSS makes styling so much faster and easier!",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Full Stack Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "MERN stack is my go-to for modern web development.",
    },
    {
      id: 4,
      name: "Emma Johnson",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "Designing components with Tailwind CSS is a game-changer.",
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Backend Engineer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "Node.js and Express.js are the backbone of our scalable APIs.",
    },
    {
      id: 6,
      name: "Sophia Lee",
      role: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "React Hooks make state management so much cleaner and easier!",
    },
  ];
  // const handleBrandChange = (brand) => {
  //   setSelectedBrands((prev) =>
  //     prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
  //   );
  // };

  // const handleCategoryChange = (category) => {
  //   setSelectedCategories((prev) =>
  //     prev.includes(category)
  //       ? prev.filter((c) => c !== category)
  //       : [...prev, category]
  //   );
  // };

  const sortedProducts = [...product].sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOption === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category))
  );

  return (
    <div className="  w-full  flex-col items-center">
      {/* Create Product Button  */}

      <div className="p-4">
        {user?.role === "admin" && (
          <Link to="/create-product">
            <h2 className="border p-4 m-4 bg-blue-400 text-white  rounded-md shadow w-[12rem]">
              Create New Product +
            </h2>
          </Link>
        )}

        {/* <h1 className="">filter</h1> */}
        <div className="flex flex-row-reverse ">
          {/* <h2 className="text-xl font-semibold mb-4 ">Filters</h2> */}
          <div className="w-1/4 mb-4">
            <h3 className="font-medium mb-3">Sort By</h3>
            <select
              className="border border-gray-300 p-2 rounded-lg w-full"
              onChange={handleSortChange}
            >
              <option value="">Select</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
        {/* <HomeSecond /> */}

        <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} {...item} />
          ))}
        </div>
      </div>

      {/* Testimonial Section  */}

      <div className="py-10 bg-gray-100">
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {testimonials &&
            testimonials.map((test) => (
              <Testimonial key={test.id} test={test} />
            ))}
        </motion.div>
      </div>
      {/* <Testimonial /> */}

      {/* FAQ Section */}
      <div className="w-full py-10">
        <h2 className="text-2xl font-semibold text-center mb-6">FAQs</h2>
        <div className=" w-[80%] p-4 m-4 mx-auto">
          <div className="border-b p-4">
            <details className="cursor-pointer">
              <summary className="font-medium text-lg">
                How can I track my order?
              </summary>
              <p className="mt-2 text-gray-600">
                You can track your order by logging into your account and
                checking the "My Orders" section.
              </p>
            </details>
          </div>
          <div className="border-b p-4">
            <details className="cursor-pointer">
              <summary className="font-medium text-lg">
                What payment methods do you accept?
              </summary>
              <p className="mt-2 text-gray-600">
                We accept credit/debit cards, PayPal, and Stripe.
              </p>
            </details>
          </div>
          <div className="border-b p-4">
            <details className="cursor-pointer">
              <summary className="font-medium text-lg">
                Can I return a product?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes, we have a 30-day return policy. Please check our returns
                page for more details.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
