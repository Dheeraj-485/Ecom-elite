import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full  sticky   flex flex-wrap justify-between space-x-1.5 p-20 m-1 bg-gray-900 text-white ">
      <div className="m-2  p-1">
        <ul className="space-y-4 ">
          <li className=" border-2 p-2 rounded-xl font-semibold space-y-7">
            <input type="text" placeholder="Enter your email" />
          </li>
          <li className="text-xl">
            {" "}
            <button
              type="button "
              className="bg-sky-50 text-black p-2 rounded-lg cursor-pointer hover:bg-sky-100
            "
            >
              Get Monthly updates and free resources
            </button>
          </li>
          {/* <li>Contact Us: ksilent528@gmail.com</li> */}
        </ul>
      </div>
      <div className="font-semibold space-y-4">
        <ul
          className="space-y-4
        "
        >
          <li>Home</li>
          <li>ContactUs</li>
          <li>AboutUs</li>
          <li>Get in touch</li>
        </ul>
      </div>
      <div className="space-y-4">
        <h3>Social Media Links</h3>
        <ul className="flex space-x-1 text-2xl">
          <li>
            <FaInstagramSquare />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaFacebookSquare />
          </li>
          <li>
            <FaLinkedinIn />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
