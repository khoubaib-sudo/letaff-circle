import '../styles/globals.css'
import 'antd/dist/reset.css'
import NavBar from '../components/NavBar'
import  {SessionProvider} from 'next-auth/react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <>
        <ToastContainer 
          position="bottom-center"
          autoClose={2000}
        />
        <NavBar />
        <Component {...pageProps} />
      </>
    </SessionProvider>
    );
}
export default MyApp
