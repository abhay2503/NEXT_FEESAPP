import connection from "@/lib/dbconnect";
import { FieldPacket, ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
    try {
        const { studentArr, month } = await req.json();


        if (!studentArr || studentArr.length === 0 || !month) {
            return Response.json({ msg: "Invalid Data" }, { status: 401 })

        }

        const studentIds = studentArr.map((student: { id: string }) => student.id);

        const currentDate = new Date().toISOString().slice(0, 10);

        const feesCaseStatement = studentArr.map((student: { id: string, StudentFees: number }) =>
            `WHEN id = '${student.id}' THEN ${student.StudentFees}`).join(' ');


        const placeholders = studentIds.map(() => '?').join(',');

        const [updateResult]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
            `UPDATE studentfees
           SET paydate = ?, paystatus = 'Yes',
               FeesPaid = CASE ${feesCaseStatement} END
           WHERE id IN (${placeholders}) AND month = ?`,
            [currentDate, ...studentIds, month]
        );

        if (updateResult.affectedRows > 0) {
            return Response.json({ msg: "Fees Updated Successfully" }, { status: 201 })

        } else {
            return Response.json({ msg: "Fees Not Updated" }, { status: 401 })

        }

    } catch (err) {
        console.error(err);
        return Response.json({ msg: "Server Error" }, { status: 500 })

    }
}