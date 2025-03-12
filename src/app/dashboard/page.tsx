"use client"
import Dashboardform from '@/components/dashboard/Dashboardform';
import Dashdisplay from '@/components/dashboard/Dashdisplay';
import { baseUrl } from '@/lib/build';
import { StudenData, StudentInput, SubjectInput } from '@/lib/type';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Dashboard() {

    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        try {
            setLoad(true)
            const response = await fetch(`${baseUrl}/api/fees/getStudents`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json()
            console.log(data);
            setLoad(false)

            if (!response.ok) {
                throw new Error(data.msg)

            }

            setStuData(data.msg)
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
    const [load, setLoad] = useState<boolean>(false)

    const calculateFeesCycle = (date: Date) => {
        const day = date.getDate();

        if (day >= 1 && day <= 10) {
            return "1-10";
        } else if (day >= 11 && day <= 20) {
            return "11-20";
        } else {
            return "21-30";
        }
    };

    const [stuData, setStuData] = useState<StudenData[]>([])

    const [inputData, setInputData] = useState<StudentInput>({
        Studentid: '',
        StudentName: '',
        StudentClass: '',
        StudentSubject: '',
        StudentDoj: new Date(),
        StudentFeesCycle: calculateFeesCycle(new Date()),
        StudentFees: 0
    })

    const [selectedSubjects, setSelectedSubjects] = useState<SubjectInput>({
        Physics: false,
        Chemistry: false,
        Computer: false,
        Maths: false,
        Accounts: false,
        Economics: false,
        English: false,
        Biology: false,
        SST: false,
    });

    const formatDate = (date: Date): string => {
        const d = new Date(date)
        return d.toISOString().split('T')[0];
    }


    console.log(selectedSubjects);



    const handleAddUpdate = async () => {
        try {

            const { Studentid, StudentName, StudentDoj, StudentFees, StudentClass, StudentFeesCycle, StudentSubject } = inputData
            if (StudentName === '' || StudentDoj === null || StudentFees === 0 || StudentClass == '' || StudentFeesCycle == '' || StudentSubject == '') {
                throw new Error("Plz Fill all Fields!!!")
            }
            if (Studentid === '') {
                setLoad(true)
                const response = await fetch(`${baseUrl}/api/fees/addStudent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ StudentName, StudentDoj, StudentFees, StudentClass, StudentFeesCycle, StudentSubject, StudentIsDelist: "No" })
                });

                console.log(response);

                const data = await response.json()


                setLoad(false)
                if (!response.ok)
                    throw new Error(data.msg)

                toast.success(data.msg)
                getdata()
                reset()
            }
            else {
                setLoad(true)

                const response = await fetch(`${baseUrl}/api/fees/updateStudent/${encodeURIComponent(Studentid)}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ StudentName, StudentFees, StudentClass, StudentFeesCycle, StudentSubject })
                });

                const data = await response.json()
                setLoad(false)

                if (!response.ok)
                    throw new Error(data.msg)

                toast.success(data.msg)
                getdata()
                reset()
            }
        } catch (error) {
            console.log(error);
            setLoad(false)

            if (error instanceof Error)
                toast.error(error.message)

            else if (typeof error === "string")
                toast.error(error)

            else
                toast.error("Error Occured")
        }


    }

    const reset = () => {
        setInputData({
            Studentid: '',
            StudentName: '',
            StudentClass: '',
            StudentSubject: '',
            StudentDoj: new Date(),
            StudentFeesCycle: calculateFeesCycle(new Date()),
            StudentFees: 0
        })
        setSelectedSubjects({
            Physics: false,
            Chemistry: false,
            Computer: false,
            Maths: false,
            Accounts: false,
            Economics: false,
            English: false,
            Biology: false,
            SST: false
        })
    }

    const handleedit = (student: StudenData) => {

        const { Studentid, StudentName, StudentDoj, StudentFees, StudentClass, StudentFeesCycle, StudentSubject } = student
        setInputData({
            Studentid, StudentName, StudentDoj, StudentFees, StudentClass, StudentFeesCycle, StudentSubject
        })

        const availSubject = StudentSubject !== '' ? StudentSubject.split(',') : [];

        const updatedSubjects = { ...selectedSubjects };

        Object.keys(updatedSubjects).forEach(subject => {
            if (availSubject.includes(subject)) {
                updatedSubjects[subject as keyof SubjectInput] = true;
            } else {
                updatedSubjects[subject as keyof SubjectInput] = false;
            }
        });

        setSelectedSubjects(updatedSubjects);
    }

    const handleDelist = async (id: string) => {
        if (window.confirm('Are You Sure!!')) {
            setLoad(true)

            const response = await fetch(`${baseUrl}/api/fees/updateStudentList/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json()
            setLoad(false)


            if (!response.ok)
                toast.error(data.msg)
            toast.success(data.msg)
            getdata()
            reset()
        }
    }


    return (
        <div className="dasboard-section flex flex-col gap-4 space-x-4 p-2 px-3 pt-3 md:flex-row md:items-start items-end">
            <div className="ticket-section flex  flex-col w-full px-1">

                <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>ADD DETAILS</h2>
                <Dashboardform load={load} inputData={inputData} setInputData={setInputData} setSelectedSubjects={setSelectedSubjects} selectedSubjects={selectedSubjects} reset={reset} formatDate={formatDate} handleAddUpdate={handleAddUpdate} />
            </div>

            <div className="table-section  w-full  px-3">
                <h2 className='text-xl text-black text-center font-bold underline underline-offset-2'>DISPLAY</h2>

                <div className="tablediv border-black border md:h-[33em] h-[27em] w-full my-5 rounded overflow-scroll">

                    <div className="relative overflow-x-auto">
                        <Dashdisplay handleedit={handleedit} stuData={stuData} formatDate={formatDate} handleDelist={handleDelist} />
                    </div>

                </div>

            </div>
        </div>
    )
}
