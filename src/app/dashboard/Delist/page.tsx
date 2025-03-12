"use client"
import DelistTable from '@/components/delist/DelistTable'
import { baseUrl } from '@/lib/build';
import { StudenData } from '@/lib/type';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Page() {
    const [load, setLoad] = useState<boolean>(false)
    const [stuData, setStuData] = useState<StudenData[]>([])

    const formatDate = (date: Date): string => {
        const d = new Date(date)
        return d.toISOString().split('T')[0];
    }
    useEffect(() => {
        getDelistdata()
    }, [])

    const getDelistdata = async () => {
        setLoad(true)
        const response = await fetch(`${baseUrl}/api/fees/getDelistStudents`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json()
        console.log(data);
        setLoad(false)

        if (!response.ok) {
            toast.error(data.msg)
            return
        }


        setStuData(data.msg)
    }

    const handleEnlist = async (id: string) => {
        if (window.confirm('Are You Sure!!')) {
            setLoad(true)

            const response = await fetch(`${baseUrl}/api/fees/enlistStudentList/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",

                }
            });

            const data = await response.json()
            setLoad(false)


            if (!response.ok) {
                toast.error(data.msg)
                return;
            }

            toast.success(data.msg)
            await getDelistdata()

        }
    }


    const handleStudentDelete = async (id: string) => {
        if (window.confirm('Are You Sure!!')) {
            setLoad(true)

            const response = await fetch(`${baseUrl}/api/fees/studentDelete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json()
            setLoad(false)


            if (!response.ok) {
                toast.error(data.msg)
                return;
            }

            toast.success(data.msg)
            await getDelistdata()
        }
    }


    return (
        <div className="table-section  w-full  px-7 py-2">
            <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>DISPLAY</h2>


            <DelistTable stuData={stuData} formatDate={formatDate} handleEnlist={handleEnlist} handleStudentDelete={handleStudentDelete} load={load} />


        </div>
    )
}
