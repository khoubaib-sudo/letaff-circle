import Head from "next/head";
import styles from "../styles/Form.module.css";
import axios from "axios";
import { HiAtSymbol} from "react-icons/hi";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //context
  const {
    state: { user },
  } = useContext(Context);
  //router
  const router = useRouter();

  //redirect fi user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for the secret code");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log(email, code , newPassword)
    // return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast("You can now login with your new password");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };
  return (
    <div className="mx-auto flex justify-center pt-20">
      <Head>
        <title>Forgot password</title>
      </Head>

      <section className="w-4/4 mx-auto flex-center flex-col gap-2">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">
            Forgot password
          </h1>
        </div>
        {/* form */}
        <form
          className="flex flex-col w-80 gap-5"
          onSubmit={success ? handleResetPassword : handleSubmit}
        >
          <div className={styles.input_group}>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              className={styles.input_text}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {success && (
            <>
              <input
                type="text"
                name="email"
                placeholder="Enter code"
                className={styles.input_text}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <input
                type="password"
                name="email"
                placeholder="Enter your new password"
                className={styles.input_text}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </>
          )}
          {/* forgetpassword button */}
          <div className="input-button">
            <button
              type="submit"
              className={styles.button}
              // disabled={loading || !email}
            >
              Submit
              {/* {loading ? (
                <LoadingOutlined spin style={{ fontSize: "40px" }} />
              ) : (
                "Submit"
              )} */}
            </button>
          </div>
        </form>
      </section>
      </div>
  );
};

export default ForgotPassword;
