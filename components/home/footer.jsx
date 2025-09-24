"use client"

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      {/* Newsletter Section */}
      <div className="bg-slate-700 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Sign Up For Email</h3>
              <p className="text-slate-300">Stay updated with our latest products and offers</p>
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 mt-6 md:mt-0">
              <span className="text-slate-300">Follow Us:</span>
              <Facebook className="w-5 h-5 cursor-pointer hover:text-green-400" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-green-400" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-green-400" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="font-semibold">All Bearings</span>
              </div>
              <p className="text-slate-400 text-sm">
                Your trusted partner for industrial components and mechanical solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Product Catalog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Custom Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Technical Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Installation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company Info</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">We're Here To Help</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Customer Service</li>
                <li>1-800-123-4567</li>
                <li>support@allbearings.com</li>
                <li>Mon-Fri 8AM-6PM EST</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 All Bearings. All rights reserved. | Privacy Policy | Terms & Conditions</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
