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
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
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
            <div className="col-span-8 md:col-span-8 md:col-start-3">
              <h2 className="flex items-center text-white text-4xl">
                Revenue report
                <DollarOutlined className="ml-auto text-5xl" />
              </h2>
              <small className="text-white">
                You get paid directly from Stripe to your bank account every 48
                hours
              </small>
              <hr className="my-4 border-1 border-white" />
              <h4 className="flex items-center text-white text-2xl">
                Pending balance 
                {balance.pending &&
                balance.pending.map((bp, i) => (
                  <span key={i} className="ml-auto text-5xl">
                    {stripeCurrencyFormatter(bp)}
                  </span>
                ))}
                
              </h4>
              <small className="text-white text-lg">
                For the last 48 hours
              </small>
              <hr className="my-4 border-1 border-white" />
              <h4 className="flex items-center text-white text-2xl">
                Payouts
                <SettingOutlined className="ml-auto cursor-pointer text-3xl transform hover:rotate-180 transition-all" />
                {/* <LoadingOutlined className="ml-auto animate-spin cursor-pointer text-3xl" /> */}
              </h4>
              <small className="text-white text-lg">
                Update your Stripe account details or view previous payouts.
              </small>
            </div>
          </div>
        </div>
        <img
          src="/assets/revenue.png"
          alt="revenue image"
          class="mt-4 ml-4  animate-float w-1/2 h-auto"
        />
      </motion.div>
    </InstructorRoute>
  );
};

export default InstructorRevenue;
