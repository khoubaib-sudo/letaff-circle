import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css';
import axios from 'axios'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState , useEffect, useContext} from 'react';
import {toast} from 'react-toastify'
import {LoadingOutlined} from '@ant-design/icons'
import { Context } from '../context';
import {useRouter} from 'next/router'

const Register = () => {
    const [name, setName] = useState("khoubaib");
    const [email, setEmail] = useState("khoubaib@gmail.com");
    const [password, setPassword] = useState("123456");
    const [cpassword, setcpassword] = useState("123");
    const [loading, setLoading] = useState(false)
    
    const {state: {user},} = useContext(Context)
    
    const router = useRouter();
    
    useEffect(() => {
        if(user !== null) router.push("/")
    }, [user])
    
    const [show, setShow] = useState({ password: false, cpassword: false })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            // console.table({name, email, password, cpassword});
            const {data} = await axios.post(
                `/api/register`, {
            name,
            email,
            password,
            cpassword,
        });
        // console.log('REGISTER RESPONSE', data)
        toast.success("Registration Successful, Please login.");
        setName('')
        setEmail('')
        setPassword('')
        setcpassword('')
        setLoading(false);
        }catch(err){
            toast.error(err.response.data)
            setLoading(false);
        }
    };
    
    return (
        <Layout>
        <Head>
            <title>Register</title>
        </Head>

        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                    <input 
                    type="text"
                    name='Username'
                    placeholder='Username'
                    className={styles.input_text}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
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
                    type={`${show.password ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className={styles.input_text}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                <div className={styles.input_group}>
                    <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    className={styles.input_text}
                    value={cpassword}
                    onChange={(e) => setcpassword(e.target.value)}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                {/* login buttons */}
                <div className="input-button">
                    <button 
                        type='submit' 
                        className={styles.button}
                        disabled={!name || !email || !password || loading}
                        >
                        {loading ? <LoadingOutlined spin style={{ fontSize: '40px' }}/> : "Register"}
                    </button> 
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Have an account? <Link className='text-blue-700' href={'/login'}>Sign In</Link>
            </p>
        </section>
        </Layout>
    )
}

export default Register;