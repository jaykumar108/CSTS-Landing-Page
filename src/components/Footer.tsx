import React from "react";
import { Mail, MapPin, SendHorizonal, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a1d3b] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ABOUT CSTS</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Events</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Involvement */}
          <div>
            <h3 className="text-lg font-semibold mb-4">GET INVOLVED</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Donation</a></li>
              <li><a href="#" className="hover:underline">Membership</a></li>
              <li><a href="#" className="hover:underline">Volunteer</a></li>
              <li><a href="#" className="hover:underline">Saksham Mithila</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CONNECT WITH US</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>csts.ind@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>maithilimachaan@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>madhubanilitfest@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>SH75 Mabbi Road, Darbhanga, Bihar 846005</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 text-white hover:text-[#1da1f2]" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 text-white hover:text-[#3b5998]" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 text-white hover:text-[#e1306c]" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 text-white hover:text-[#0077b5]" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm">
          &copy; 2022 CSTS | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
