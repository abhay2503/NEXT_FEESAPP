import connection from "@/lib/dbconnect";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {

    try {
        const { StudentName, StudentClass, StudentSubject, StudentFeesCycle, StudentFees } = await req.json();
        const id = req.nextUrl.pathname.split('/').pop();

        if (!StudentName || !StudentClass || !StudentSubject || !StudentFeesCycle || !StudentFees || !id) {
            return Response.json({ msg: "Invalid Data" }, { status: 401 })

        }

        // Execute SELECT query and expect 'result' to contain an array of rows
        const [result]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
            'UPDATE student set StudentName=?,StudentClass=?,StudentSubject=?,StudentFeesCycle=?,StudentFees=? where Studentid=?',
            [StudentName, StudentClass, StudentSubject, StudentFeesCycle, StudentFees, id]
        );

        if (result.affectedRows === 0) {
            return Response.json({ msg: "Student Not Updated" }, { status: 401 })

        }

        return Response.json({ msg: "Student Updated Successfully" }, { status: 201 })


    } catch (err) {
        console.error(err);
        return Response.json({ msg: "Server Error" }, { status: 500 })

    }
}