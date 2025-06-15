import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";

let desc =
  "Create compact, memorable links effortlessly with GoLinkly's streamlined platform. Distribute URLs seamlessly across multiple channels. Enhance your digital strategy with GoLinkly. Monitor engagement and organize your links efficiently to boost your online visibility. Create compact, memorable links effortlessly with GoLinkly's streamlined platform. Distribute URLs seamlessly across multiple channels.";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  console.log("TOKEN FROM LANDING PAGE: " + token);

  const dashBoardNavigateHandler = () => {

  };
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 lg:px-14 sm:px-8 px-4">
      <div className="lg:flex-row flex-col    lg:py-5   pt-16   lg:gap-10 gap-8 flex justify-between items-center">
        <div className=" flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-bold font-roboto text-white lg:text-6xl md:text-5xl sm:text-4xl text-3xl   lg:leading-[65px] md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[70%] w-full"
          >
            Transform Long URLs Into Smart, Trackable Links
          </motion.h1>
          <p className="text-gray-300 text-sm my-5">
            GoLinkly revolutionizes URL management by converting lengthy addresses into intelligent, 
            trackable links instantly. With our advanced dashboard, GoLinkly empowers you to create 
            short URLs within moments. Transform your link sharing experience with GoLinkly today.
          </p>
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="bg-green-600 hover:bg-green-700  w-40 text-white rounded-md  py-2"
            >
              Manage Links
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="border-green-400 border w-40 text-green-400 hover:bg-green-400 hover:text-gray-900 rounded-md  py-2 "
            >
              Create Short Link
            </motion.button>
          </div>
        </div>
        <div className="   flex-1 flex   justify-center w-full">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-[550px] sm:w-[520px] w-[450px] object-cover rounded-md"
            src="/images/img2.png"
            alt=""
          />
        </div>
      </div>
      <div className="sm:pt-12 pt-7">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white font-roboto font-bold lg:w-[60%]  md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
        >
          Everything you need to manage powerful short links{" "}
        </motion.p>
        <div className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
          <Card
            title="Effortless Link Creation"
            desc="Discover the simplicity of generating compact, branded URLs with just one click. Our user-friendly platform and instant processing guarantee you can begin creating shortened links immediately without complications."
          />
          <Card
            title="Advanced Link Intelligence"
            desc="Access detailed performance metrics through our sophisticated analytics suite. Monitor engagement rates, demographic insights, and traffic sources to refine your digital marketing approaches effectively."
          />
          <Card
            title="Enterprise-Grade Protection"
            desc="Trust in our comprehensive security infrastructure. Every shortened URL benefits from military-grade encryption protocols, guaranteeing your information stays protected and confidential at all times."
          />
          <Card
            title="Lightning Speed Performance"
            desc="Experience instant redirects and maximum availability through our robust server network. Your shortened URLs maintain consistent accessibility and responsiveness, delivering exceptional user experiences consistently."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;