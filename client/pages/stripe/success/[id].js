import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import UserRoute from "../../../components/routes/UserRoute";
import { useRouter } from "next/router";
import axios from "axios";

const StripeSuccess = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) successRequest();
  }, [id]);

  console.log(id);

  const successRequest = async () => {
    const { data } = await axios.get(`/api/stripe-success/${id}`);
    // console.log("SUCCESS REQ DATA", data);
    router.push(`/user/course/${data.course.slug}`);
  };

  return (
    <UserRoute showNav={false}>
      <div className="grid grid-cols-1 md:grid-cols-3 text-center">
        <div className="col-span-2 pb-5">
          <div className="flex justify-center p-5">
            <LoadingOutlined spin className="text-5xl text-purple-500 p-5" />
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </UserRoute>
  );
};

export default StripeSuccess;
