'use client'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import Spinner from './Spinner'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'


export default function Loginform() {
    const [input, setInput] = useState({
        name: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleedit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const login = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                redirect: false, // Avoid automatic redirect
                name: input.name,
                password: input.password,
            })
            setIsLoading(false)

            if (result?.error) {
                throw new Error(result.error)
            }
            toast.success('Login Successful')
            router.push('/dashboard') // ✅ Redirect to a protected route
            return
        }
        catch (err) {
            if (err instanceof Error)
                toast.error(err.message)
            else if (typeof err == "string")
                toast.error(err)
            else
                toast.error("Wrong Credentials")
        }
    }
    return (
        <>
            {isLoading && <Spinner />}
            <form onSubmit={login} className='space-y-6 p-6'>
                <div>
                    <label htmlFor="name" className='block text-sm text-gray-700 font-medium'>Name</label>
                    <input type="text" id="name" name='name' value={input.name} onChange={(e) => handleedit(e)} placeholder='Enter Name' className='text-sm py-2 form-input p-1 rounded mt-1 w-full block focus:outline-gray-500 focus:outline-1 text-black outline-none border border-gray-300' />
                </div>
                <div>
                    <label htmlFor="password" className='block text-sm text-gray-700 font-medium'>Password</label>

                    <div className="relative mt-5">
                        <input className='text-sm py-2 pe-9 form-input p-1 rounded mt-1 w-full block focus:outline-gray-500 focus:outline-1 outline-none border text-black border-gray-300' inputMode='numeric'
                            type={showPassword ? "text" : "password"} name='password' placeholder="Enter Password" value={input.password} onChange={handleedit} />
                        <button type="button" className="absolute right-3 top-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    {/* <input type="password" id="password" name='password' value={user.password} onChange={handleedit}  placeholder='Enter Password' className=' text-sm form-input p-1 rounded mt-1 w-full block focus:outline-gray-500 focus:outline-1 outline-none border border-gray-300' />        */}
                    <button type='submit' className="mt-10 transition block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-[#C75B7A] hover:bg-[#bc395e] focus:bg-[#bc395e] transform hover:-translate-y-1 hover:shadow-lg">Login</button>
                </div>

            </form>
        </>

    )
}
