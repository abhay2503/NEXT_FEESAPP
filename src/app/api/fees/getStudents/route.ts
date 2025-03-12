import connection from "@/lib/dbconnect";
import { Admin } from "@/lib/type";
import { FieldPacket } from "mysql2";

export async function GET() {
    try {
        const [result]: [Admin[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM student WHERE StudentIsDelist="No"');

        return Response.json({ msg: result }, { status: 201 })

    } catch (error) {
        console.error(error);
        return Response.json({ msg: "Server Error" }, { status: 500 })
    }
}