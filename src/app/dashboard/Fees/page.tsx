"use client"
import FeesSelect from '@/components/fees/FeesSelect';
import FeesTable from '@/components/fees/FeesTable';
import { baseUrl } from '@/lib/build';
import { FeesDetails, StudentFees } from '@/lib/type';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Page() {

    const [load, setLoad] = useState<boolean>(false)
    const [stuFeesData, setStuFeesData] = useState<StudentFees[]>([])
    const [selectedMonth, setSelectedMonth] = useState<string>('')
    const [studentArr, setStudentArr] = useState<FeesDetails[]>([])

    const getFeesData = async (month: string) => {
        try {

            setLoad(true)
            const response = await fetch(`${baseUrl}/api/fees/getStudentsFees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ month })
            });

            const data = await response.json()
            console.log(data);
            setLoad(false)

            if (!response.ok) {
                throw new Error(data.msg)

            }

            if (data.msg.length == 0) {
                setStuFeesData([])
                throw new Error('No Data Found!')

            }
            setStuFeesData(data.msg)
        } catch (error) {
            console.log(error);

            if (error instanceof Error)
                toast.error(error.message)

            else if (typeof error === "string")
                toast.error(error)

            else
                toast.error("Error Occured")
        }

    }



    const formatDate = (date: Date): string => {
        console.log(date);

        const d = new Date(date)
        return d.toISOString().split('T')[0];
    }


    const handleStudentFees = (feesid: string, studentName: string, studentFees: number, isChecked: boolean) => {
        if (isChecked) {
            // If the checkbox is checked, add the student
            setStudentArr(prev => [...prev, { "id": feesid, "StudentName": studentName, "StudentFees": studentFees }]);
        } else {
            // If the checkbox is unchecked, remove the student
            setStudentArr(prev => prev.filter(student => student.id !== feesid));
        }
    };


    const handleSubmitFees = async () => {
        if (studentArr.length == 0) {
            toast.error("Select Students First")
            return
        }
        const confirmMessage = studentArr
            .map((stu) => `${stu.StudentName} - ${stu.StudentFees}`)
            .join('\n');

        const isConfirmed = window.confirm(`Are you sure you want to proceed with the following students?\n\n${confirmMessage}`);

        if (isConfirmed) {
            setLoad(true)
            const response = await fetch(`${baseUrl}/api/fees/updateFees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ studentArr, month: selectedMonth })
            });
            const data = await response.json()
            setLoad(false)
            if (!response.ok)
                return toast.error(data.msg)

            toast.success(data.msg)
            getFeesData(selectedMonth)
            setStudentArr([])

        }

    }


    return (
        <div className="dasboard-section flex flex-col gap-4 md:space-x-4 p-2 px-3 pt-3 md:flex-row md:items-start">
            <div className="ticket-section flex  flex-col md:w-[40%] w-full px-1">

                <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>SELECT MONTH</h2>
                <div className="inputs mt-5">


                    <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
                        <FeesSelect selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} getFeesData={getFeesData} setStudentArr={setStudentArr} />
                    </div>




                </div>
            </div>

            <div className="table-section md:w-[60%] w-full  md:px-3">
                <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>DISPLAY</h2>

                <FeesTable stuFeesData={stuFeesData} studentArr={studentArr} handleStudentFees={handleStudentFees} formatDate={formatDate} handleSubmitFees={handleSubmitFees} load={load} />

            </div>
        </div>
    )
}
