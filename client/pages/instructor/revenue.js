import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import InstructorRoute from "../../components/routes/InstructorRoute";
import axios from "axios";
import {
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { stripeCurrencyFormatter } from "../../utils/helpers";
import { motion } from "framer-motion";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });

  useEffect(() => {
    sendBalanceRequest();
  }, []);

  const sendBalanceRequest = async () => {
    console.log("send balance request");
  };

  // Framer Motion Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <InstructorRoute>
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
      >
        <div class="md:mr-auto ml-auto">
          <div class="row pt-2">
            <div class="col-md-8 offset-md-2 ">
              <h2 class="flex items-center text-white text-4xl">
                Revenue report
                <DollarOutlined class="ml-auto text-5xl" />
              </h2>
              <small class="text-white ">
                You get paid directly from Stripe to your bank account every 48
                hours
              </small>
              <hr class="my-4 border-1 border-white" />
              <h4 class="flex items-center text-white text-2xl">
                Pending balance <span >$0.00</span>
              </h4>
              <small class="text-white text-lg">For the last 48 hours</small>
              <hr class="my-4 border-1 border-white" />
              <h4 class="flex items-center text-white text-2xl">
                Payouts
                <SettingOutlined class="ml-auto cursor-pointer text-3xl transform hover:rotate-180 transition-all" />
                <LoadingOutlined class="ml-auto animate-spin cursor-pointer text-3xl" />
              </h4>
              <small class="text-white text-lg">
                Update your Stripe account details or view previous payouts.
              </small>
            </div>
          </div>
        </div>
        <img
          src="/assets/revenue.png"
          alt="Example image"
          class="mt-4 ml-4  animate-float w-1/2 h-auto"
        />
      </motion.div>
    </InstructorRoute>
  );
};

export default InstructorRevenue;
