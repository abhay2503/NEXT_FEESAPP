import connection from "@/lib/dbconnect";
import { Admin } from "@/lib/type";
import { FieldPacket } from "mysql2";

export async function GET() {
    try {

        // Execute SELECT query and expect 'result' to contain an array of rows
        const [result]: [Admin[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM student WHERE StudentIsDelist="Yes"');


        return Response.json({ msg: result }, { status: 201 })


    } catch (err) {
        console.error(err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }
}