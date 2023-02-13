import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css';
import Image from 'next/image'
import axios from 'axios'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { signIn, signOut } from "next-auth/react"
import {toast} from 'react-toastify'
import {LoadingOutlined} from '@ant-design/icons'

const Login = () => {
    const [email, setEmail] = useState("khoubaib@gmail.com");
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            // console.table({name, email, password, cpassword});
            const {data} = await axios.post(
                `/api/login`, {
            email,
            password,
        });
        console.log('LOGIN RESPONSE', data)
        // setLoading(false);
        }catch(err){
            toast.error(err.response.data)
            setLoading(false);
        }
    };
    // // Google Handler function
    // async function handleGoogleSignin(){
    //     signIn('google', { callbackUrl : "http://localhost:3000"})
    // }
    // // Github Login 
    // async function handleGithubSignin(){
    //     signIn('github', { callbackUrl : "http://localhost:3000"})
    // }

    return (
        <Layout>

        <Head>
            <title>Login</title>
        </Head>
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className={styles.input_text}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                <div className={styles.input_group}>
                    <input 
                    type={`${show ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className={styles.input_text}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                {/* login buttons */}
                <div className="input-button">
                    <button 
                    type='submit' 
                    className={styles.button}
                    disabled={!email || !password }
                    >
                        Login
                    </button>
                </div>
                <p className='text-center text-gray-400 '>
                    Forgot password? <Link  className='text-blue-700' href={'/'}>Click here</Link>
                </p>
                <div className="input-button">
                    <button 
                    type='button' 
                    className={styles.button_custom}>
                        Sign In with Google <Image src={'/assets/google.svg'} alt="googlelog" width="20" height={20} ></Image>
                    </button>
                </div>
                <div className="input-button">
                    <button type='button'  alt="githublogo" className={styles.button_custom}>
                        Sign In with Github <Image src={'/assets/github.svg'} width={25} height={25}></Image>
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                don't have an account yet? <Link  className='text-blue-700' href={'/register'}>Sign Up</Link>
            </p>
        </section>

        </Layout>
    )
}

export default Login;