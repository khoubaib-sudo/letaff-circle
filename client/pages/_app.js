import '../styles/globals.css'
import 'antd/dist/reset.css'
import NavBar from '../components/NavBar'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from '../context';  

function MyApp({ Component, pageProps }) {
  return (
      <Provider>
        <ToastContainer 
          position="bottom-center"
          autoClose={2000}
        />
        <NavBar />
        <Component {...pageProps} />
      </Provider>
    );
}
export default MyApp
