import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import { SettingOutlined, LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
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
        <div className="flex flex-col md:flex-row justify-between items-center py-2"></div>
        <Row justify="center" align="middle">
          <Col xs={24} md={12} className="text-center">
            <Title level={1} style={{ fontWeight: 600, color: "#333" }}>
              Become an <span className="text-purple-500">Instructor</span>
            </Title>
            <Text type="secondary" style={{ fontSize: 20 }}>
              Steup payout to publish courses on Letaff
            </Text>
            <br />
            <Text style={{ fontSize: 13 }}>
              Letaff Partners with stripe to transfer eranings to your bank
              account
            </Text>
            <br />
            <br />
            <br />

            <Button
              className="mb-3"
              type="primary"
              shape="round"
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
              style={{
                backgroundColor: "#9f7aea",
                color: "black",
                borderColor: "#9f7aea",
              }}
              ghost
            >
              {loading ? "Processing..." : "Payout Setup"}
            </Button>

            <p className="lead">
              you will be redirected to stripe to complete onbording process.
            </p>
          </Col>
          <Col xs={24} md={12} className="text-center">
            <img
              src="/assets/hero1.png"
              alt="hero"
              className="mx-auto w-3/4 md:w-full"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BecomeInstructor;
