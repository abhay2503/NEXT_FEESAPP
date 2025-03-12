import { StudenData } from '@/lib/type';
import React from 'react'

type DashdisplayProps = {
    handleedit: (student: StudenData) => void;
    stuData: StudenData[];
    formatDate: (date: Date) => string
    handleDelist: (id: string) => Promise<void>

}
export default function Dashdisplay({ handleedit, stuData, handleDelist }: DashdisplayProps) {

    return (
        <table className=" w-full text-sm text-center rtl:text-right text-gray-500">
            {stuData.length === 0 ? <thead><tr><th className='text-2xl'>ADD STUDENTS !!!</th></tr></thead> :
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
                                        {/* {formatDate(stu.StudentDoj)} */}
                                        {new Date(stu.StudentDoj).toLocaleDateString("en-US", {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                        {stu.StudentFeesCycle}
                                    </td>
                                    <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                        {stu.StudentFees}
                                    </td>
                                    <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-gray-900">

                                        <button className='rounded mr-2 bg-green-700 text-xs text-white px-3 py-1  hover:bg-green-500 shadow-md' onClick={() => handleedit(stu)}>Edit</button>
                                        <button className='rounded bg-blue-700 text-xs text-white px-3 py-1  hover:bg-blue-500 shadow-md' onClick={() => handleDelist(stu.Studentid)}>Delist</button>
                                    </td>

                                </tr>
                            )
                        })}



                    </tbody>
                </>
            }


        </table>
    )
}
