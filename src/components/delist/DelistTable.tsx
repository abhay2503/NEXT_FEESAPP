import React from 'react'
import Loadingdialog from '../Spinner'
import { StudenData } from '@/lib/type'

type DelistTableProps = {
    stuData: StudenData[];
    formatDate: (date: Date) => string
    handleEnlist: (id: string) => Promise<void>
    handleStudentDelete: (id: string) => Promise<void>
    load: boolean;
}
export default function DelistTable({ stuData, formatDate, handleEnlist, handleStudentDelete, load }: DelistTableProps) {
    return (
        <>

            <div className="tablediv border-black border md:h-[33em] h-[27em] w-full my-5 rounded overflow-scroll">
                {load && <Loadingdialog />}
                <div className="relative overflow-x-auto ">
                    <table className=" w-full text-sm text-center rtl:text-right text-gray-500">
                        {stuData.length === 0 ? <thead><tr><th className='text-2xl'>NO STUDENTS !!!</th></tr></thead> :
                            <>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 truncate">

                                    <tr>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Name
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Class
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Subject
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Date Of Join
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            FeesCycle
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Fees
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stuData.map((stu, index) => {
                                        return (
                                            <tr className="bg-white border-b truncate" key={index + 1}>
                                                <td scope="row" className="md:px-2 md:py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                    {stu.StudentName}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.StudentClass}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.StudentSubject}
                                                </td>

                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {formatDate(stu.StudentDoj)}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.StudentFeesCycle}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.StudentFees}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900">


                                                    <button className='rounded mr-1 bg-blue-700 text-xs text-white px-2 py-1  hover:bg-blue-500 shadow-md' onClick={() => handleEnlist(stu.Studentid)}>Enlist</button>

                                                    <button className='rounded bg-red-700 text-xs text-white px-2 py-1  hover:bg-red-500 shadow-md' onClick={() => handleStudentDelete(stu.Studentid)}>Delete</button>
                                                </td>

                                            </tr>
                                        )
                                    })}



                                </tbody>
                            </>
                        }


                    </table>
                </div>
            </div>
        </>

    )
}
