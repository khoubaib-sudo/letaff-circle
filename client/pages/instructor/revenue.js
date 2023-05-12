import { useState, useEffect } from "react";

import InstructorRoute from "../../components/routes/InstructorRoute";
import axios from "axios";
import { DollarOutlined, LoadingOutlined } from "@ant-design/icons";
import { RiSettings4Fill } from "react-icons/ri";
import { List, Typography } from "antd";
import { stripeCurrencyFormatter, formatAmount } from "../../utils/helpers";
import { motion } from "framer-motion";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);
  const [payouts, setPayouts] = useState([]);

  const { Title, Text } = Typography;

  useEffect(() => {
    sendBalanceRequest();
    fetchPayouts();
  }, []);

  const sendBalanceRequest = async () => {
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
  };

  const fetchPayouts = async () => {
    try {
      const { data } = await axios.get("/api/instructor/payouts");
      setPayouts(data);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch payout history. Please try again later.");
    }
  };

  const handlePayoutSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/instructor/payout-settings");
      window.location.href = data;
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Unable to access payout settings. Try later.");
    }
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
                Payouts{" "}
                {!loading ? (
                  <RiSettings4Fill
                    onClick={handlePayoutSettings}
                    className="ml-auto animate-spin cursor-pointer text-3xl "
                  />
                ) : (
                  <LoadingOutlined className="ml-auto animate-spin cursor-pointer text-xl" />
                )}
              </h4>
              <small className="text-white text-lg">
                Click on the Setting icon to view your previous payouts.
              </small>
              <List
        dataSource={payouts}
        renderItem={(payout) => (
          <List.Item>
            <List.Item.Meta
              title={<Text className="text-white">Payout ID: {payout.id}</Text>}
              description={
                <div>
                <div>
                  <Text className="text-white">Amount: {formatAmount(payout.amount, payout.currency)}{"   "}</Text>
                  <Text className="text-white">Status: {payout.status}</Text>
                </div>
                <div>
                  <Text className="text-white">Initiated: {new Date(payout.created * 1000).toLocaleDateString()}{"   "}</Text>
                  <Text className="text-white">Estimated Arrival: {new Date(payout.arrival_date * 1000).toLocaleDateString()}</Text>
                </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
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
