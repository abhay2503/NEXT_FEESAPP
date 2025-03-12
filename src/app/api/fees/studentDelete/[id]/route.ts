import connection from "@/lib/dbconnect";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        if (!id) {

            return Response.json({ msg: "Invalid username or password" }, { status: 401 })
        }

        // Execute SELECT query and expect 'result' to contain an array of rows
        const [result]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
            `DELETE FROM studentfees WHERE Studentid =?`, [id]
        );

        const [result1]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
            `DELETE FROM student WHERE Studentid =?`, [id]
        );


        if (result.affectedRows === 0 && result1.affectedRows === 0) {
            return Response.json({ msg: "Student Not Deleted" }, { status: 401 })


        }

        return Response.json({ msg: "Student Deleted Successfully" }, { status: 201 })



    } catch (err) {
        console.error(err);
        return Response.json({ msg: "Server Error" }, { status: 500 })
    }
}