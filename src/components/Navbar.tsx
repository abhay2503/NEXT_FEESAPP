"use client"
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { motion } from "framer-motion"

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const activePathname = usePathname();

    console.log(activePathname);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handlelogout = () => {
        if (window.confirm('Are You Sure!!')) {
            signOut({
                callbackUrl: '/'
            })
        }

    };

    const routes = [
        {
            name: "DASHBOARD",
            path: "/dashboard"
        },
        {
            name: "FEES",
            path: "/dashboard/Fees"
        },
        {
            name: "DELIST",
            path: "/dashboard/Delist"
        }

    ]


    return (
        <nav className="bg-gray-200 shadow-lg text-black md:flex md:flex-row md:items-center md:justify-between md:px-24 px-5 w-full z-10 p-2">
            <div className="flex items-center justify-between">
                <Link href="/dashboard">
                    <Image src="/NEWLOGO1.png" width={130} height={16} className='h-16 md:h-16' alt="NEWLOGO" />
                </Link>

                <span
                    className="text-2xl cursor-pointer md:hidden inline-block float-right"
                    onClick={toggleDropdown}
                >
                    <FaBars />
                </span>
            </div>

            <ul
                className={`md:flex md:items-center z-[999] md:z-auto md:static absolute bg-gray-200 w-full left-0 md:w-auto md:bg-transparent md:pl-0 pl-2 md:opacity-100 ${isDropdownOpen ? 'opacity-100 top-[66px]' : 'opacity-0 top-[-400px]'
                    } transition-all ease-in duration-500`}
            >
                {routes.map((route) => (
                    <li key={route.name} className="mx-4 my-6 md:my-0 group">
                        <Link
                            href={route.path}
                            className="md:text-lg font-medium duration-200 relative pb-2"
                        >
                            {route.name}

                            {
                                activePathname === route.path && (<motion.div layoutId="header-active-link" className='bg-black h-1 w-full absolute bottom-0'></motion.div>)
                            }
                        </Link>

                    </li>

                ))}
                <li className="mx-4 my-6 md:my-0">
                    <button
                        className="bg-blue-200 text-black rounded-md text-sm px-4 py-2 hover:bg-blue-300 transition-all duration-300 md:text-md"
                        onClick={handlelogout}
                    >
                        LOGOUT
                    </button>
                </li>
            </ul>
        </nav>
    )
}
