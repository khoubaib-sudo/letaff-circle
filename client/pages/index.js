import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import NavBar from '../components/NavBar'
import PopularClass from '../components/PopularClass'
import Services from '../components/Services'
import { useContext } from 'react';
import {Context} from '../context';


export default function Home() {
  const { state, dispatch } = useContext(Context);
  const {user} = state;

  
  return (
    <div >
      <Head>
        <title>Letaff -Circle Education Website</title>
        <meta name="description" content="Generated by create next app" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {user === null && (
        <>
          <Hero/>
          <Services/>
          <PopularClass/>
          <Footer/>
        </>
      )}
      
      {user !== null && (
        <p>
          welcome
        </p>
      )}
    </div>
  )
}
