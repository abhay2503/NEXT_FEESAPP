import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import connection from "@/lib/dbconnect";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        // Get token from request
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json({ msg: 'Unauthorized' }, { status: 401 });
        }

        console.log("Session Data:", session);

        // Extract admin ID from session
        const adminId = session.user.id;
        console.log("Admin ID:", adminId);

        const id = req.nextUrl.pathname.split('/').pop();

        if (!id) {
            return Response.json({ msg: "Invalid ID" }, { status: 400 });
        }

        // Execute UPDATE query
        const [result]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
            'UPDATE student SET StudentIsDelist = ? WHERE Studentid = ? and adminId=?',
            ["No", id, adminId]
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
