import "../styles/globals.css";
import "antd/dist/reset.css";
import "../styles/submenu.css";
import NavBar from "../components/NavBar";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Zoom}
        theme="colored"
        toastStyle={{
          backgroundColor: "#a855f7", //a855f7
          borderRadius: "35px",
          color: "black",     
        }}
      />
      <NavBar />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
