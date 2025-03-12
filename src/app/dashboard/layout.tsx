import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <div className='background rounded-md bg-slate-50 p-2 '>
                {children}
            </div>
        </>

    )
}
