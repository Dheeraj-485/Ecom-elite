import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from ""; // Assuming you have this action
import { ProductCard } from "../components/ProductCard";
import { fetchAllProduct } from "../redux/productSlice";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
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

  const { loading, product, currentPage, totalPages } = useSelector(
    (state) => state.products
  );
  // console.log("", product, currentPage, totalPages);

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
    const fetch = async () => {
      await dispatch(fetchAllProduct({ page: currentPage, limit: 10 }));
    };
    fetch();
  }, [dispatch, currentPage, totalPages]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Tech Enthusiast",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      review:
        "This laptop exceeded my expectations! Lightning-fast performance and a stunning display.",
    },
    {
      id: 2,
      name: "Michael Smith",
      role: "Software Developer",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      review:
        "Absolutely love the new smartphone! The battery lasts all day, and the camera quality is unreal.",
    },
    {
      id: 3,
      name: "Jessica Brown",
      role: "Graphic Designer",
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      review:
        "The color accuracy on this laptop is perfect for my design work. Highly recommend!",
    },
    {
      id: 4,
      name: "Daniel White",
      role: "Gamer",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      review:
        "This gaming laptop handles everything I throw at it. Super smooth gameplay!",
    },

    {
      id: 6,
      name: "David Wilson",
      role: "Backend Engineer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "Node.js and Express.js are the backbone of our scalable APIs.",
    },
    {
      id: 5,
      name: "Sophia Miller",
      role: "Photographer",
      image: "https://randomuser.me/api/portraits/women/40.jpg",
      review:
        "The camera on this phone is a game changer! Professional-quality shots with ease.",
    },
    {
      id: 7,
      name: "Emma Davis",
      role: "Student",
      image: "https://randomuser.me/api/portraits/women/38.jpg",
      review:
        "This budget laptop is perfect for my studies. Fast and lightweight!",
    },
    {
      id: 8,
      name: "James Anderson",
      role: "Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      review:
        "I run my business from this smartphone—smooth, powerful, and incredibly reliable!",
    },
    {
      id: 9,
      name: "Olivia Carter",
      role: "Freelancer",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      review:
        "The battery life on this laptop is insane! I can work all day without worrying about charging.",
    },
    {
      id: 10,
      name: "William Martin",
      role: "Music Producer",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      review: "Amazing sound quality from this phone—perfect for music lovers!",
    },
    {
      id: 11,
      name: "Isabella Thompson",
      role: "Marketing Manager",
      image: "https://randomuser.me/api/portraits/women/34.jpg",
      review:
        "This laptop is perfect for multitasking! I can run multiple apps without any lag.",
    },
    {
      id: 12,
      name: "Ethan Roberts",
      role: "IT Consultant",
      image: "https://randomuser.me/api/portraits/men/48.jpg",
      review:
        "Security features on this phone are top-notch. I feel safe using it for work.",
    },
    {
      id: 13,
      name: "Charlotte Williams",
      role: "Content Creator",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      review:
        "Editing videos on this laptop is a breeze! It handles 4K footage effortlessly.",
    },
    {
      id: 14,
      name: "Benjamin Scott",
      role: "Tech Reviewer",
      image: "https://randomuser.me/api/portraits/men/37.jpg",
      review:
        "One of the best laptops I've tested this year. Great value for money!",
    },
    {
      id: 15,
      name: "Mia Lewis",
      role: "Social Media Manager",
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      review:
        "This phone keeps me connected 24/7. The social media experience is seamless!",
    },
    {
      id: 16,
      name: "Noah Adams",
      role: "College Student",
      image: "https://randomuser.me/api/portraits/men/39.jpg",
      review:
        "Fast, durable, and affordable—this laptop is perfect for students like me!",
    },
    {
      id: 17,
      name: "Liam Garcia",
      role: "Photographer",
      image: "https://randomuser.me/api/portraits/men/53.jpg",
      review:
        "I’m amazed by the camera on this phone. It captures incredible details!",
    },
    {
      id: 18,
      name: "Ava Nelson",
      role: "Digital Artist",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      review:
        "The touchscreen on this laptop is super responsive. Love using it for my artwork!",
    },
    {
      id: 19,
      name: "Ethan Baker",
      role: "Business Owner",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      review:
        "This phone has become my office on the go. Handles everything smoothly.",
    },
    {
      id: 20,
      name: "Harper Evans",
      role: "Fitness Coach",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      review:
        "Great fitness tracking features on this phone. Keeps me motivated every day!",
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#3B82F6" />
      </div>
    );
  }

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

        <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {filteredProducts?.map((item) => (
            <ProductCard key={item._id} {...item} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              dispatch(fetchAllProduct({ page: currentPage - 1, limit: 10 }))
            }
          >
            Prev
          </button>
          <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              dispatch(fetchAllProduct({ page: currentPage + 1, limit: 10 }))
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* Testimonial Section  */}

      <div className="py-10 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-6">
          TESTIMONIALS
        </h2>

        <motion.div
          className=" overflow-hidden flex space-x-6"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
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
