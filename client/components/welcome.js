import { Layout, Typography } from "antd";
import Head from "next/head";

const { Title } = Typography;
const { Content } = Layout;

const WelcomePage = () => {
  return (
    <div className="container mx-auto ">
      <Head>
        <title>Welcome to E-Learning</title>
      </Head>
      <Content className="flex flex-col items-center justify-center ">
        <Title className="text-4xl font-bold mb-8">Welcome to Letaff</Title>
        <p className="text-lg text-center mb-16">
          Learn anything, anytime, anywhere with our online courses.
        </p>
        <div className="flex justify-center">
          <img
            src="/assets/hero3.png"
            alt="Welcome to Letaff illustration"
            className="h-100 w-auto mb-8"
          />
        </div>
        <p className="text-lg text-center mb-16">
          Our courses are designed to help you acquire new skills and knowledge,
          advance your career, and achieve your goals.
        </p>
      </Content>
    </div>
  );
};

export default WelcomePage;
