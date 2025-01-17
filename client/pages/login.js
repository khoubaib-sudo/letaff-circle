import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import axios from "axios";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("khoubaibmaam@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  //state
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  //router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  //show password
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.table({name, email, password, cpassword});
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      // console.log('LOGIN RESPONSE', data)
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      //save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));

      // redirect
      router.push("/user");

      // setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center pt-20">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex justify-center items-center">
        <section className="w-3/4 flex flex-col items-center gap-10">
          <div className="title">
            <h1 className="mx-auto flex justify-center text-gray-800 text-4xl font-bold py-4">
              Explore
            </h1>
            <p className="w-3/4 mx-auto text-gray-400">
              Lorem ipsum dolor sittur adipisicing elit. Dolores,
              officia?
            </p>
          </div>

          {/* form */}
          <form className="flex flex-col gap-5 w-96" onSubmit={handleSubmit}>
            <div className={styles.input_group}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input_text}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="password"
                className={styles.input_text}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>

            {/* login buttons */}
            <div className="input-button">
              <button
                type="submit"
                className={styles.button}
                disabled={!email || !password || loading}
              >
                {loading ? (
                  <LoadingOutlined spin style={{ fontSize: "40px" }} />
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <p className="text-center text-gray-400 ">
              Forgot password?{" "}
              <Link className="text-blue-700" href={"/forgot-password"}>
                Click here
              </Link>
            </p>
            <div className="input-button">
              <button type="button" className={styles.button_custom}>
                Sign In with Google{" "}
                <Image
                  src={"/assets/google.svg"}
                  alt="googlelog"
                  width="20"
                  height={20}
                ></Image>
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center text-gray-400 ">
            don't have an account yet?{" "}
            <Link className="text-blue-700" href={"/register"}>
              Sign Up
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
