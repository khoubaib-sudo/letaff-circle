import "../styles/globals.css";
import "antd/dist/reset.css";
import "../styles/submenu.css";
import NavBar from "../components/NavBar";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Flip}
        theme="colored"
        closeButton={false}
        toastStyle={{
          backgroundColor: "#a855f7", //a855f7
          borderRadius: "35px",
          color: "black", 
          height: "20px"    
        }}
      />
      <NavBar />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
