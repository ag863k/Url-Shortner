import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2">
      <div className="bg-white w-full sm:py-10 py-8  ">
        <h1 className="sm:text-4xl text-slate-800 text-3xl font-bold italic  mb-3">
          About GoLinkly
        </h1>
        <p className="text-gray-700 text-sm  mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          GoLinkly transforms long URLs into smart, trackable links for enhanced
          digital presence. Effortlessly create, organize, and monitor your
          shortened links. GoLinkly transforms long URLs into smart, trackable
          links for enhanced digital presence. Effortlessly create, organize, and
          monitor your shortened links. GoLinkly transforms long URLs into smart,
          trackable links for enhanced digital presence.
        </p>
        <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          <div className="flex items-start">
            <FaLink className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Effortless Link Creation
              </h2>
              <p className="text-gray-600">
                Discover the simplicity of generating compact, branded URLs with
                just one click. Our user-friendly platform and instant processing
                guarantee you can begin creating shortened links immediately
                without any technical complications or learning curves.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaShareAlt className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Advanced Link Intelligence
              </h2>
              <p className="text-gray-600">
                Access detailed performance metrics through our sophisticated
                analytics suite. Monitor engagement rates, demographic insights,
                and traffic sources to refine your digital marketing approaches
                and maximize campaign effectiveness strategically.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaEdit className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Enterprise-Grade Protection
              </h2>
              <p className="text-gray-600">
                Trust in our comprehensive security infrastructure. Every
                shortened URL benefits from military-grade encryption protocols,
                guaranteeing your information stays protected and confidential
                while maintaining optimal performance standards.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaChartLine className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Lightning Speed Performance
              </h2>
              <p className="text-gray-600">
                Experience instant redirects and maximum availability through our
                robust server network. Your shortened URLs maintain consistent
                accessibility and responsiveness, delivering exceptional user
                experiences across all devices and platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;