import Loginform from '@/components/Loginform'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <>
      <div className=' bg-slate-50 h-screen flex items-center justify-center font-poppins'>

        <div className="shadow-lg w-96">
          <div className="border-t-8 rounded-sm border-[#C75B7A] bg-white p-12 shadow-2xl w-96">
            <Image unoptimized width={160} height={100} alt='LOGO.png' src="/NEWLOGO1.png" className="md:w-[64%] mx-auto" />
            <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>Login</h2>
            <Loginform />
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?
                <Link href="/Register" className="text-blue-500 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
