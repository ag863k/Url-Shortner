import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 backdrop-blur-sm text-white py-8 z-40 relative">
      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2">GoLinkly</h2>
          <p>Transforming long URLs into smart, trackable links</p>
        </div>

        <p className="mt-4 lg:mt-0">
          &copy; 2025 GoLinkly. All rights reserved.
        </p>

        <div className="text-center lg:text-right mt-4 lg:mt-0">
          <p className="text-sm font-medium">
            Professional URL Shortening Service
          </p>
          <p className="text-xs opacity-80">
            Trusted by thousands of users worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;