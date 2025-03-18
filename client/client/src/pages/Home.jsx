// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ProductCard } from "../components/ProductCard";
// import { fetchAllProduct } from "../redux/productSlice";
// import CreateProduct from "./CreateProduct";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const { product } = useSelector((state) => state.products);
//   console.log(product);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAllProduct());
//   }, [dispatch]);
//   return (
//     <>
//       <Link to="/create-product">
//         <h2 className="border p-4 m-4 bg-green-400 rounded-md shadow w-[12rem]  ">
//           Create New product +
//         </h2>
//       </Link>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
//         {product &&
//           product.map((item) => <ProductCard key={item._id} {...item} />)}
//       </div>
//     </>
//   );
// };

// export default Home;

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

// const Home = () => {
//   const dispatch = useDispatch();
//   const { product } = useSelector((state) => state.products);
//   const [sortOption, setSortOption] = useState("");
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   useEffect(() => {
//     dispatch(fetchAllProduct());
//   }, [dispatch]);

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   const handleBrandChange = (brand) => {
//     setSelectedBrands((prev) =>
//       prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
//     );
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category]
//     );
//   };

//   const sortedProducts = [...product].sort((a, b) => {
//     if (sortOption === "lowToHigh") {
//       return a.price - b.price;
//     } else if (sortOption === "highToLow") {
//       return b.price - a.price;
//     } else {
//       return 0;
//     }
//   });

//   const filteredProducts = sortedProducts.filter(
//     (product) =>
//       (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
//       (selectedCategories.length === 0 ||
//         selectedCategories.includes(product.category))
//   );

//   return (
//     <div className="flex">
//       <div className="w-1/4 p-4">
//         <h2 className="text-xl font-semibold mb-4">Filters</h2>
//         <div className="mb-4">
//           <h3 className="font-medium">Sort By</h3>
//           <select
//             className="border border-gray-300 p-2 rounded-lg w-full"
//             onChange={handleSortChange}
//           >
//             <option value="">Select</option>
//             <option value="lowToHigh">Price: Low to High</option>
//             <option value="highToLow">Price: High to Low</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <h3 className="font-medium">Brand</h3>
//           {["Brand1", "Brand2", "Brand3"].map((brand) => (
//             <div key={brand}>
//               <input
//                 type="checkbox"
//                 id={brand}
//                 value={brand}
//                 onChange={() => handleBrandChange(brand)}
//               />
//               <label htmlFor={brand} className="ml-2">
//                 {brand}
//               </label>
//             </div>
//           ))}
//         </div>
//         <div className="mb-4">
//           <h3 className="font-medium">Category</h3>
//           {["Category1", "Category2", "Category3"].map((category) => (
//             <div key={category}>
//               <input
//                 type="checkbox"
//                 id={category}
//                 value={category}
//                 onChange={() => handleCategoryChange(category)}
//               />
//               <label htmlFor={category} className="ml-2">
//                 {category}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="w-3/4 p-4">
//         <Link to="/create-product">
//           <h2 className="border p-4 m-4 bg-green-400 rounded-md shadow w-[12rem]">
//             Create New Product +
//           </h2>
//         </Link>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
//           {filteredProducts.map((item) => (
//             <ProductCard key={item._id} {...item} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

const Home = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const [sortOption, setSortOption] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

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
    <div className=" w-full  flex-col items-center">
      {/* <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 m-4 w-15 h-15"
      >
        {isSidebarVisible ? "-" : "+"}
      </button> */}
      {/* {isSidebarVisible && (
        <div className="w-1/4 p-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <h3 className="font-medium">Sort By</h3>
            <select
              className="border border-gray-300 p-2 rounded-lg w-full"
              onChange={handleSortChange}
            >
              <option value="">Select</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Brand</h3>
            {["Brand1", "Brand2", "Brand3"].map((brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  id={brand}
                  value={brand}
                  onChange={() => handleBrandChange(brand)}
                />
                <label htmlFor={brand} className="ml-2">
                  {brand}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Category</h3>
            {["Category1", "Category2", "Category3"].map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category} className="ml-2">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Hero Caraousal  */}

      {/* <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showArrows={true}
        interval={4000}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src="https://pixabay.com/photos/laptop-computer-notebook-2665794/"
            alt="Banner 1"
          />
          <p className="legend">Best Deals Here</p>
        </div>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={Image2}
            alt="Banner 2"
          />
          <p className="legend">Amazing Discount</p>
        </div>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={Image3}
            alt="Banner 3"
          />
          <p className="legend">Shop with Confidence</p>
        </div>
      </Carousel> */}

      {/* Create Product Button  */}

      <div className="p-4">
        <Link to="/create-product">
          <h2 className="border p-4 m-4 bg-blue-400 text-white  rounded-md shadow w-[12rem]">
            Create New Product +
          </h2>
        </Link>

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

        <div className=" border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} {...item} />
          ))}
        </div>
      </div>

      {/* Testimonial Section  */}

      {/* <div className="w-full bg-gray-100 py-10 mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Testimonials
        </h2>
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showArrows={false}
          interval={4000}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center justify-center text-center p-6">
            <div className="bg-white p-6 shadow-lg rounded-lg w-[80%] max-w-md">
              <p className="italic">
                "This platform changed my shopping experience. Amazing service!"
              </p>
              <h4 className="font-bold mt-4">- John Doe</h4>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6">
            <div className="bg-white p-6 shadow-lg rounded-lg w-[80%] max-w-md">
              <p className="italic">
                "Fast delivery, great prices. Highly recommend!"
              </p>
              <h4 className="font-bold mt-4">- Jane Smith</h4>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6">
            <div className="bg-white p-6 shadow-lg rounded-lg w-[80%] max-w-md">
              <p className="italic">
                "Incredible product variety and customer support!"
              </p>
              <h4 className="font-bold mt-4">- Alice Brown</h4>
            </div>
          </div>
        </Carousel>
      </div> */}

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
