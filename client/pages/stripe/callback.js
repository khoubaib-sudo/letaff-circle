import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const StripeCallback = () => {
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios.post("/api/get-account-status").then((res) => {
        window.location.href = "/instructor";
      });
    }
  }, [user]);

  return (
    <div
      className="mx-auto flex justify-center "
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <LoadingOutlined
        spin
        style={{
          fontSize: "48px",
        }}
      />
    </div>
  );
};

export default StripeCallback;
