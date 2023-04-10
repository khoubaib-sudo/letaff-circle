import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const StripeCallback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios.post("/api/get-account-status").then((res) => {
        // console.log(res);
        dispatch({
            type: "LOGIN",
            payload: res.data
        })
        window.localStorage.setItem('user', JSON.stringify(res.data))
        window.location.href = "/instructor";
      });
    }
  }, [user]);

  return (
    <div
      className="mx-auto flex justify-center "
      style={{
        color: "#a855f7",
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
