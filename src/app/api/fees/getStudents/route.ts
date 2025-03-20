import connection from "@/lib/dbconnect";
import { Admin } from "@/lib/type";
import { FieldPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ msg: 'Unauthorized' }, { status: 401 });
    }

    console.log("Session Data:", session);

    // Extract admin ID from session
    const adminId = session.user.id;

    try {
        const [result]: [Admin[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM student WHERE StudentIsDelist="No" and adminid=?', [adminId]);

        return Response.json({ msg: result }, { status: 201 })

    } catch (error) {
        console.error(error);
        return Response.json({ msg: "Server Error" }, { status: 500 })
    }
}