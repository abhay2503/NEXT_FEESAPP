import { RowDataPacket } from "mysql2"

export type Student = {
    Studentid: string,
    StudentName: string,
    StudentClass: string,
    StudentFees: number

}

export type Student1 = Student & {
    StudentSubject: string,
    StudentDoj: Date,
    StudentFeesCycle: string,
}


export type StudenData = Student1 & {

    StudentIsDelist: string
}

export type StudentInput = Student1 & {
    StudentDoj: Date;
}


export type StudentFees = Student & {
    id: string,
    FeesPaid: number,
    month: number,
    year: number,
    payDate: Date,
    payStatus: string
}
export type SubjectInput = {
    Physics: boolean
    Chemistry: boolean,
    Computer: boolean,
    Maths: boolean,
    Accounts: boolean,
    Economics: boolean,
    English: boolean,
    Biology: boolean,
    SST: boolean,
}

export interface Admin extends RowDataPacket {
    id: number;
    adminname: string;
    adminpassword: string;
}


export interface ExistingStudent extends RowDataPacket {
    Studentid: number;
    StudentName: string;
    StudentClass: string;
}


export interface FeesDetails {
    id: string,
    StudentName: string,
    StudentFees: number
}
