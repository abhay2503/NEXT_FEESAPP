import connection from "@/lib/dbconnect";
import { Admin } from "@/lib/type";
import { FieldPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET() {
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

        // Execute SELECT query and expect 'result' to contain an array of rows
        const [result]: [Admin[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM student WHERE StudentIsDelist="Yes" and adminId=?', [adminId]);


        return Response.json({ msg: result }, { status: 201 })


    } catch (err) {
        console.error(err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }
}