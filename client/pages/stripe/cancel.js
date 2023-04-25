import { WarningFilled } from "@ant-design/icons";
import UserRoute from "../../components/routes/UserRoute";

const StripeCancel = () => {
  return (
    <UserRoute showNav={false}>
      <div className="grid grid-cols-1 md:grid-cols-3 text-center pl-24">
        <div className="col-span-2">
          <WarningFilled  className="text-5xl text-purple-500 p-20" />
          <p className="text-xl font-bold">Payment failed. Try again.</p>
        </div>
      </div>
    </UserRoute>
  );
};

export default StripeCancel;
