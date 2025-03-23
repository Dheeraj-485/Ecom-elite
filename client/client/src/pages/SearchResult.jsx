import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../config/baseUrl";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";

const SearchResult = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("title");

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) return;
      try {
        const response = await axios.get(
          `${BASE_URL}/api/products/query?title=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.data;
        console.log("Search data", data);
        if (response.status !== 200) {
          throw new Error(data.message || "Something went wrong");
        }

        setProducts(data.items || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchQuery]);

  return (
    <div className="container mt-4">
      <h2>Search Results for "{searchQuery}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found for "{searchQuery}". Try a different search!</p>
      )}

      <div className="flex flex-wrap justify-center items-center">
        {products.map((item) => (
          //   <div key={blog._id} className="col-md-4">
          //     <div className="card mb-3">
          //       <div className="card-body">
          //         <h5 className="card-title">{blog.title}</h5>
          //         <div className="blog-image-wrapper">
          //           <img
          //             src={blog.coverImage}
          //             className="card-img-top"
          //             alt="Image"
          //           />
          //           <div className="image-overlay"></div>
          //         </div>
          //         <p className="card-text">
          //           {blog.description.length > 100
          //             ? `${blog.description.substring(0, 100)}...`
          //             : blog.description}
          //         </p>
          //         <a href={`/products/${blog._id}`} className="btn btn-primary">
          //           Read More
          //         </a>
          //       </div>
          //     </div>
          //   </div>
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
