import connection from "@/lib/dbconnect";
import { ExistingStudent } from "@/lib/type";
import { FieldPacket, ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
    try {
        const { name, password } = await req.json();

        if (!name || !password) {
            return Response.json({ msg: 'Invalid Data' }, { status: 401 })
        }


        // Execute SELECT query and expect 'result' to contain an array of rows

        const [result]: [ExistingStudent[], FieldPacket[]] = await connection.execute(
            'SELECT adminname,adminpassword FROM admin WHERE adminname=? AND adminpassword=?',
            [name, password]
        );

        if (result.length !== 0) {
            return Response.json({ msg: 'Admin Already Exists' }, { status: 401 })
        }


        const [insertResult]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
            'Insert into admin(id,adminname,adminpassword) value(?,?,?)',
            [Date.now(), name, password]
        );

        if (insertResult.affectedRows === 0) {
            return Response.json({ msg: 'Admin Is Not Added' }, { status: 401 })

        }


        return Response.json({ msg: 'Admin Added Successfully' }, { status: 201 })
    } catch (err) {
        console.error(err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })
    }
}