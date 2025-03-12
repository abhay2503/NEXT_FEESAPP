import connection from "@/lib/dbconnect";
import { Admin } from "@/lib/type";
import { FieldPacket } from "mysql2";

export async function POST(req: Request) {
    try {

        const { month } = await req.json()

        if (!month) {
            return Response.json({ msg: "Invalid Data" }, { status: 401 })
        }

        const currentYear = new Date().getFullYear();
        let year: number;
        if (month >= 1 && month <= 3) {
            // year = currentYear + 1;
            year = currentYear
        } else {
            year = currentYear;
        }


        const [result]: [Admin[], FieldPacket[]] = await connection.execute(
            `SELECT studentfees.*,student.StudentName,student.StudentClass,student.StudentFees 
          from studentfees
          LEFT JOIN student ON
          student.Studentid=studentfees.Studentid
          WHERE studentfees.month=? and year=?`, [parseInt(month), year]);

        console.log(result);
        return Response.json({ msg: result }, { status: 201 })

    } catch (err) {
        console.error(err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })
    }
}