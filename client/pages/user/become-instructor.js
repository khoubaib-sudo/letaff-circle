import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import { SettingOutlined, LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

const BecomeInstructor = () => {
  //State
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const beacomeInstructor = () => {
    // console.log("beacome Instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast.error("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };
  return (
    <>
      <div className="container mx-auto ">
      <div className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-2"></div>
        <Row justify="center" align="middle">
          <Col xs={24} md={12} className="text-center">
            <Title level={1} style={{ fontWeight: 600, color: "#333" }}>
              Become an <span className="text-white">Instructor</span>
            </Title>
            <Text  className="text-white" style={{ fontSize: 20 }}>
              Steup payout to publish courses on Letaff
            </Text>
            <br />
            <Text className="text-white" style={{ fontSize: 13 }}>
              Letaff Partners with stripe to transfer eranings to your bank
              account
            </Text>
            <br />
            <br />
            <br />

            <Button
              className="mb-3 bg-purple-600 text-white"
              shape="round"
              type="primary"
              icon={
                <span style={{ position: "relative", top: "-3px", right:"5px" }}>
                  {loading ? <LoadingOutlined /> : <SettingOutlined />}
                </span>
              }
              size="large"
              onClick={beacomeInstructor}
              disabled={
                (user && user.role && user.role.includes("Instructor")) ||
                loading
              }
            >
              {loading ? "Processing..." : "Payout Setup"}
            </Button>

            <p className="text-white">
              you will be redirected to stripe to complete onbording process.
            </p>
          </Col>
          <Col xs={24} md={12} className="text-center">
            <img
              src="/assets/hero1.png"
              alt="hero"
              className="mx-auto w-3/4 md:w-full animate-float"
            />
          </Col>
        </Row>
      </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
