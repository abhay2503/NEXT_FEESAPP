import { FeesDetails, StudentFees } from '@/lib/type'
import React from 'react'
import Loadingdialog from '../Spinner';

type FeesTableProps = {
    stuFeesData: StudentFees[];
    studentArr: FeesDetails[];
    handleStudentFees: (feesid: string, studentName: string, studentFees: number, isChecked: boolean) => void;
    handleSubmitFees: () => Promise<string | undefined>;
    formatDate: (date: Date) => string;
    load: boolean;
}
export default function FeesTable({ stuFeesData, studentArr, handleStudentFees, formatDate, handleSubmitFees, load }: FeesTableProps) {

    return (
        <>
            {load && <Loadingdialog />}
            <div className="tablediv border-black border md:h-[30em] h-[27em] w-full my-5 rounded overflow-scroll">

                <div className="relative overflow-x-auto">
                    <table className=" w-full text-sm text-center rtl:text-right text-gray-500">
                        {stuFeesData.length === 0 ? <thead><tr><th className='text-2xl'>NO STUDENTS !!!</th></tr></thead> :
                            <>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 truncate">

                                    <tr>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Select
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Name
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Class
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Month
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Year
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Payment
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Payment Date
                                        </th>
                                        <th scope="col" className="md:px-6 md:py-3 truncate">
                                            Status
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {stuFeesData.map((stu, index) => {
                                        return (
                                            <tr className={`${stu.payStatus === "Yes" ? 'bg-green-300 opacity-90' : 'bg-red-300'} border-b truncate`} key={index + 1} >

                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    <input id="react-checkbox-list" type="checkbox" className="w-4 h-4 text-blue-600" disabled={stu.payStatus === "Yes"} checked={(studentArr.some(student => student.id === stu.id)) || stu.payStatus === "Yes"} onChange={(e) => handleStudentFees(stu.id, stu.StudentName, stu.StudentFees, e.target.checked)} />
                                                </td>
                                                <td scope="row" className="md:px-2 md:py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                    {stu.StudentName}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.StudentClass}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.month}
                                                </td>

                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.year}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.FeesPaid}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.payDate === null ? '' : formatDate(stu.payDate)}
                                                </td>
                                                <td className="md:px-2 md:py-3 truncate whitespace-nowrap font-medium overflow-hidden overflow-ellipsis text-sm text-gray-900 ">
                                                    {stu.payStatus === "Yes" ? "Paid" : "Not Paid"}
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
            <div className='w-full flex items-center justify-center'>
                <button className='w-[40%] rounded text-md md:my-3 bg-green-700 text-md text-white px-5 py-2  hover:bg-green-500 shadow-md' onClick={() => handleSubmitFees()}>Submit</button>
            </div>
        </>
    )
}
