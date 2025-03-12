import { StudentInput, SubjectInput } from '@/lib/type';
import React from 'react'
import Loadingdialog from '../Spinner';


type DashboardProps = {
    load: boolean;
    inputData: StudentInput;
    selectedSubjects: SubjectInput;
    reset: () => void;
    setInputData: React.Dispatch<React.SetStateAction<StudentInput>>;
    setSelectedSubjects: React.Dispatch<React.SetStateAction<SubjectInput>>
    formatDate: (date: Date) => string;
    handleAddUpdate: () => Promise<void>;
}

export default function Dashboardform({ load, inputData, selectedSubjects, reset, setInputData, setSelectedSubjects, formatDate, handleAddUpdate }: DashboardProps) {


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {

        if (e.target.name === "StudentDoj") {
            const selectedDate = new Date(e.target.value)
            const day = selectedDate.getDate();


            // Determine the fee cycle based on the day
            let feescycle = "";
            if (day >= 1 && day <= 10) {
                feescycle = "1-10";
            } else if (day >= 11 && day <= 20) {
                feescycle = "11-20";
            } else if (day >= 21 && day <= 31) {
                feescycle = "21-30";
            }


            // const formattedDate = selectedDate.toISOString().slice(0, 10);
            console.log(typeof selectedDate);

            // Update StudentDoj and StudentFeesCycle together
            setInputData(prevState => ({
                ...prevState,
                StudentDoj: selectedDate, // Store as string in "YYYY-MM-DD" format
                StudentFeesCycle: feescycle,
            }));
        } else {
            // Handle other fields
            setInputData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };



    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target

        setSelectedSubjects(prev => ({
            ...prev,
            [event.target.name]: checked,
        }));

        let selectedSubjects = inputData.StudentSubject !== '' ? inputData.StudentSubject.split(",") : []

        if (checked) {
            selectedSubjects.push(event.target.name)
        }
        else {
            selectedSubjects = selectedSubjects.filter((subject) => subject !== event.target.name)
        }
        setInputData(prev => ({ ...prev, "StudentSubject": selectedSubjects.join(",") }))
    }

    return (
        <>
            {load && <Loadingdialog />}
            <div className="inputs mt-5">


                <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
                    <div className="input-organisation w-full">
                        <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Name</label>
                        <input type="text" id="Employee" name="StudentName" value={inputData.StudentName} onChange={(e) => handleChange(e)} aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Enter Student Name" />
                    </div>

                </div>

                <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between gap-8">
                    <div className="input-organisation w-full">
                        <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Class</label>
                        <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" value={inputData.StudentClass} name="StudentClass" onChange={(e) => handleChange(e)} >
                            <option value="">--Select Option--</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>

                        </select>
                    </div>


                    <div className="input-organisation w-full">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 " >Date</label>
                        <input type="date" disabled={inputData.Studentid !== ''} id="mobno" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" name='StudentDoj'
                            value={formatDate(inputData.StudentDoj)} onChange={(e) => handleChange(e)} />
                    </div>
                </div>


                <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
                    <div className="input-organisation w-full">
                        <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Fees Cycle</label>
                        <input type="text" id="Employee" disabled={true} name="StudentFeesCycle" value={inputData.StudentFeesCycle} onChange={(e) => handleChange(e)} aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Student FeesCycle" />
                    </div>


                </div>

                <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">


                    <div className="input-organisation w-full">
                        <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Fees</label>
                        <input type="number" id="Employee" name="StudentFees" value={inputData.StudentFees} onChange={(e) => handleChange(e)} aria-describedby="helper-text-explanation" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-1 focus:outline-gray-900 block w-full p-1" placeholder="Enter Student Fees" />
                    </div>


                </div>


                <div className="input-details mt-4 flex flex-1 md:flex-row flex-col justify-between">
                    <div className="input-organisation w-full">
                        <label htmlFor="Employeename" className="block mb-2 text-sm font-medium text-gray-900 " >Subjects</label>
                        <ul className="items-center w-full text-sm font-medium md:mt-6 text-gray-900  rounded-lg sm:flex">
                            <li className="w-full  ">
                                <div className="flex items-center ps-3">
                                    <input id="vue-checkbox-list" type="checkbox" className="w-4 h-4 text-blue-600  " onChange={handleSubjectChange} name="Physics" checked={selectedSubjects.Physics} />
                                    <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Physics</label>
                                </div>
                            </li>
                            <li className="w-full  ">
                                <div className="flex items-center ps-3">
                                    <input id="react-checkbox-list" type="checkbox" className="w-4 h-4 text-blue-600   " onChange={handleSubjectChange} name="Chemistry" checked={selectedSubjects.Chemistry} />
                                    <label htmlFor="react-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Chemistry</label>
                                </div>
                            </li>
                            <li className="w-full  ">
                                <div className="flex items-center ps-3">
                                    <input id="angular-checkbox-list" type="checkbox" className="w-4 h-4 text-blue-600   " onChange={handleSubjectChange} name="Maths" checked={selectedSubjects.Maths} />
                                    <label htmlFor="angular-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Maths</label>
                                </div>
                            </li>

                        </ul>

                        <ul className="items-center w-full text-sm font-medium text-gray-900  rounded-lg sm:flex">

                            <li className="w-full  ">
                                <div className="flex items-center ps-3">
                                    <input id="vue-checkbox-list" type="checkbox" onChange={handleSubjectChange} name="Biology" className="w-4 h-4 text-blue-600   " checked={selectedSubjects.Biology} />
                                    <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Biology</label>
                                </div>
                            </li>


                            <li className="w-full  ">
                                <div className="flex items-center ps-3">
                                    <input id="vue-checkbox-list" type="checkbox" onChange={handleSubjectChange} name="SST" className="w-4 h-4 text-blue-600   " checked={selectedSubjects.SST} />
                                    <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">SST</label>
                                </div>
                            </li>

                            <li className="w-full  ">
                                <div className="flex items-center ps-3">
                                    <input id="vue-checkbox-list" type="checkbox" onChange={handleSubjectChange} name="Computer" className="w-4 h-4 text-blue-600   " checked={selectedSubjects.Computer} />
                                    <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Computer</label>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>


                <div className="detail-btn mt-10 flex flex-1 justify-start gap-4">
                    <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={handleAddUpdate} >{inputData.Studentid !== '' ? "UPDATE" : "ADD"}</button>
                    <button className='rounded-lg text-md p-1 px-3 text-white bg-blue-700 hover:bg-blue-600' onClick={reset} >RESET</button>
                </div>
            </div>
        </>

    )
}
