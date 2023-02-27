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

const ForgotPassword = () => {
    // state
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false); 
    
    
    //context
    const {state: {user}} = useContext(Context)
    //router
    const router = useRouter()
    
    //redirect fi user is logged in
    useEffect(() => {
        if (user !== null) router.push("/");
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const {data} = await axios.post('/api/forgot-password', { email })
            setSuccess(true)
            toast("Check your email for the secret code")
        } catch(err) {
            setLoading(false)
            toast(err.response.data)
        }
    }    
    return (
        <Layout>
        <Head>
            <title>Forgot password</title>
        </Head>

        <section className='w-4/4 mx-auto flex-center flex-col gap-2'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Forgot password</h1>
            </div>
            {/* form */}
            <form className='flex flex-col w-80 gap-5' onSubmit={handleSubmit} >
                <div className={styles.input_group}>
                    <input 
                    type="text"
                    name='email'
                    placeholder='Enter Email'
                    className={styles.input_text}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                
                {/* login buttons */}
                <div className="input-button">
                    <button 
                        type='submit' 
                        className={styles.button}
                        disabled={loading || !email }
                        >
                        {loading ? <LoadingOutlined spin style={{ fontSize: '40px' }}/> : "Submit"}
                    </button> 
                </div>
            </form>

        </section>
        </Layout>
    )
}

export default ForgotPassword;