import { FeesDetails } from '@/lib/type';
import React from 'react'

type FeesSelectProps = {
    selectedMonth: string;
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
    getFeesData: (month: string) => Promise<void>;
    setStudentArr: React.Dispatch<React.SetStateAction<FeesDetails[]>>
}
export default function FeesSelect({ selectedMonth, setSelectedMonth, getFeesData, setStudentArr }: FeesSelectProps) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value)
        getFeesData(e.target.value)
        setStudentArr([])
    }

    return (
        <>

            <div className="input-organisation w-full">
                <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Month</label>

                <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" value={selectedMonth} name="StudentClass" onChange={(e) => handleChange(e)}>
                    <option value="">--Select Option--</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>

                </select>
            </div>
        </>


    )
}
