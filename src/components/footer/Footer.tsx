import { useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-200 p-2 md:p-8 lg:p-1">
      <div className="bg-zinc-900 rounded-t-lg p-4 md:p-8 lg:p-4">
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-8 md:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img src="src/pglogo.jpg" alt="PGHunT" className="w-full h-24 rounded-2xl" />
            </div>

            {/* Contact US */}
            <div className="">
              <h5 className="uppercase text-lg font-bold mb-4">Contact Us</h5>
              <p className="text-sm mb-2">
                Email:{" "}
                <a href="#" className="hover:text-gray-100">
                  info@example.com
                </a>
              </p>
              <p className="text-sm mb-2">
                Phone:{" "}
                <a href="#" className="hover:text-gray-100">
                  +1 123 456 7890
                </a>
              </p>
              <p className="text-sm mb-2">
                Address:{" "}
                <a href="#" className="hover:text-gray-100">
                  123 Main St, Anytown, USA
                </a>
              </p>
            </div>

            {/* Quick links */}
            <div className="">
              <h5 className="uppercase text-lg font-bold mb-4">Quick Links</h5>
              <ul className="flex flex-wrap justify-center md:justify-start md:flex-col sm:flex-row gap-2 sm:gap-4 md:gap-0">
                <li className="text-sm mb-2">
                  <a href="/" className="hover:text-gray-100">
                    About
                  </a>
                </li>
                <li className="text-sm mb-2">
                  <a href="/" className="hover:text-gray-100">
                    Home
                  </a>
                </li>
                <li className="text-sm mb-2">
                  <a href="#" className="hover:text-gray-100">
                    About
                  </a>
                </li>
                <li className="text-sm mb-2">
                  <a href="#" className="hover:text-gray-100">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="">
              <h5 className="uppercase text-lg font-bold mb-4">Follow Us</h5>
              <div className="flex items-center justify-center md:justify-start">
                <a href="#" className="mr-4 hover:text-gray-100">
                  <div className="bg-white-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                    <Facebook className="w-6 h-6" />
                  </div>
                </a>
                <a href="#" className="mr-4 hover:text-gray-100">
                  <div className="bg-white-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                    <Twitter className="w-6 h-6" />
                  </div>
                </a>
                <a
                  href="www.instagram.com"
                  className="mr-4 hover:text-gray-100"
                >
                  <div className="bg-white-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                    <Instagram className="w-6 h-6" />
                  </div>
                </a>
              </div>
            </div>
            {/* Application install */}

            <div className="">
              <h5 className="uppercase text-lg font-bold mb-4">Download App!</h5>
              <a href="http://play.google.com">
                <img
                  src="src/google-play.png"
                  alt="Download App!"
                  className="w-32 items-center justify-center rounded-xl"
                />
              </a>
            </div>

        </div>
        {/* Copyright Text */}
        <div className="text-sm text-gray-500 text-center">
          © 2023-24 PGHunt Technologies Solution Pvt. Ltd.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
