import connection from "@/lib/dbconnect";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();

        if (!id) {
            return Response.json({ msg: "Invalid ID" }, { status: 400 });
        }

        // Execute UPDATE query
        const [result]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
            'UPDATE student SET StudentIsDelist = ? WHERE Studentid = ?',
            ["No", id]
        );

        if (result.affectedRows === 0) {
            return Response.json({ msg: "Cannot Enlist Student" }, { status: 404 });
        }

        return Response.json({ msg: "Successfully Enlisted Student" }, { status: 200 });

    } catch (err) {
        console.error(err);
        return Response.json({ msg: "Server Error" }, { status: 500 });
    }
}
