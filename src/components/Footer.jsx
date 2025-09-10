import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">HungerHub</h2>
          <p className="text-sm leading-relaxed">
            Your favorite meals delivered fast at your door.
            Join us and experience seamless food ordering and delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="hover:text-red-500 transition">About Us</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-red-500 transition">Contact</a>
            </li>
            <li>
              <a href="#partner" className="hover:text-red-500 transition">Partner With Us</a>
            </li>
            <li>
              <a href="" className="hover:text-red-500 transition">Privacy Policy</a>
            </li>
            <li>
              <a href="" className="hover:text-red-500 transition">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="flex items-center gap-2 mb-2">
            <FaEnvelope /> <span>support@hungerhub.com</span>
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt /> <span>+91 98765 43210</span>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} HungerHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
